import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";
import { 
  logUserApproval, 
  logHoursUpdate, 
  logError, 
  logWarning, 
  logSecurityEvent,
  logActivity 
} from "../../utils/logger.js";

const userActions = async (req, res) => {
  console.log("approve/reject/log users");

  const { userID, actionID, action, actionValue } = req.body;

  // console.log(`${userID} , ${actionID} , ${action}, ${actionValue}`);

  if (!userID || !actionID || !action || !actionValue) {
    const message = "Request body Failed.";
    console.log(message);
    
    await logWarning(
      userID, 
      'USER_ACTION_MISSING_DATA', 
      `User action attempt with missing data: userID=${userID}, actionID=${actionID}, action=${action}`, 
      req
    );
    
    return res.status(400).send({
      message: message,
      status: "fail",
    });
  }

  let roleType;
  try {
    roleType = await validateToken(req);
    console.log(`role type: ${roleType.role}`);
  } catch (error) {
    console.log(error);
    
    await logSecurityEvent(
      userID, 
      'USER_ACTION_AUTH_FAILED', 
      `User action failed - authentication error: ${error.message}`, 
      req
    );
    
    return res.status(error.statusCode).send({
      message: error,
      status: "fail",
    });
  }

  console.log(
    `Attempting Action ${action} From User: ${userID} on User ${actionID}`
  );

  if (roleType.role === "admin") {
    try {
      let answer;
      let targetUser;

      // Get target user info for logging
      try {
        targetUser = await dbConnection.getUserById(actionID);
      } catch (err) {
        console.log(`Could not fetch target user info for logging: ${err}`);
      }

      if (action === "approve" && actionValue === "NA") {
        console.log("approving User");
        answer = await dbConnection.createVolunteer(actionID);
        
        if (answer) {
          await logUserApproval(
            userID, 
            actionID, 
            targetUser?.username || 'unknown', 
            true, 
            req
          );
        }
      }

      if (action === "reject" && actionValue === "NA") {
        console.log("rejecting User");
        answer = await dbConnection.rejectUser(actionID);
        
        if (answer) {
          await logUserApproval(
            userID, 
            actionID, 
            targetUser?.username || 'unknown', 
            false, 
            req
          );
        }
      }

      if (action === "log-user") {
        console.log(`logging about User ${actionValue}`);
        // Note: This uses the old addLog function, but we'll log this action too
        answer = await dbConnection.addSystemLog(
          actionID, 
          'ADMIN_NOTE', 
          actionValue, 
          req?.ip, 
          req?.headers?.['user-agent']
        );
        
        if (answer) {
          await logActivity(
            userID, 
            'USER_LOG_ADDED', 
            `Admin added log for user ${targetUser?.username || actionID}: ${actionValue}`, 
            'INFO', 
            req
          );
        }
      }

      if (action === "approve-hours") {
        console.log(`approving ${actionValue} hours for User ${actionID}`);
        const hoursToApprove = parseInt(actionValue);
        
        if (isNaN(hoursToApprove) || hoursToApprove <= 0) {
          const message = "Invalid hours value";
          console.log(message);
          
          await logWarning(
            userID, 
            'HOURS_APPROVAL_INVALID', 
            `Invalid hours value for approval: ${actionValue}`, 
            req
          );
          
          return res.status(400).send({
            message: message,
            status: "fail",
          });
        }
        
        answer = await dbConnection.incrementVolHours(actionID, "approved_hours", hoursToApprove);
        
        if (answer) {
          await logHoursUpdate(
            userID, 
            actionID, 
            targetUser?.username || 'unknown', 
            'approved_hours', 
            hoursToApprove, 
            req
          );
        }
      }

      if (action === "decrement-unapproved-hours") {
        console.log(`decrementing ${actionValue} unapproved hours for User ${actionID}`);
        const hoursToDecrement = parseInt(actionValue);
        
        if (isNaN(hoursToDecrement) || hoursToDecrement <= 0) {
          const message = "Invalid hours value";
          console.log(message);
          
          await logWarning(
            userID, 
            'HOURS_DECREMENT_INVALID', 
            `Invalid hours value for decrement: ${actionValue}`, 
            req
          );
          
          return res.status(400).send({
            message: message,
            status: "fail",
          });
        }
        
        answer = await dbConnection.incrementVolHours(actionID, "unapproved_hours", -hoursToDecrement);
        
        if (answer) {
          await logHoursUpdate(
            userID, 
            actionID, 
            targetUser?.username || 'unknown', 
            'unapproved_hours', 
            -hoursToDecrement, 
            req
          );
        }
      }

      if (!answer) {
        const message = `action failed!! invalid action type`;
        console.log(message);
        
        await logError(
          userID, 
          'USER_ACTION_FAILED', 
          `User action failed: ${action} on user ${actionID} with value ${actionValue}`, 
          req
        );
        
        res.status(401).send({
          message: message,
          status: "fail",
        });
      } else {
        const message = `${action} action successful!`;
        console.log(message);
        res.status(200).send({
          message: message,
          status: "success",
          //TODO maybe make the system reload the user table or refresh
        });
      }
    } catch (error) {
      console.error(`Error during action ${action} error:`, error);
      
      await logError(
        userID, 
        'USER_ACTION_ERROR', 
        `Error during user action ${action} on user ${actionID}: ${error.message}`, 
        req
      );
      
      res.status(500).send({
        message: "An internal server error occurred during user action.",
        status: "error",
      });
    }
  } else {
    const message = "User lacks permissions";
    console.log(message);
    
    await logSecurityEvent(
      userID, 
      'USER_ACTION_UNAUTHORIZED', 
      `Unauthorized user action attempt: ${action} by user with role ${roleType.role}`, 
      req
    );
    
    res.status(401).send({
      message: message,
      status: "error",
    });
  }
};

export default userActions;
