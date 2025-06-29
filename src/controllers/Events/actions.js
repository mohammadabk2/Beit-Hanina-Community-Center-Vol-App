import dbconnection from "../../database/dbconnection.js";
import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";
import { 
  logEventEnrollment, 
  logEventStatusChange, 
  logVolunteerAssignment, 
  logError, 
  logWarning, 
  logSecurityEvent,
  logActivity 
} from "../../utils/logger.js";

const eventActions = async (req, res) => {
  console.log("Event Actions");

  const { targetUserID, userID, actionID, action, actionValue } = req.body;

  console.log(`${userID} , ${actionID} , ${action}, ${actionValue}`);

  if (!userID || !actionID || !action || actionValue === undefined) {
    const message = "Request body Failed.";
    console.log(message);
    
    await logWarning(
      userID, 
      'EVENT_ACTION_MISSING_DATA', 
      `Event action attempt with missing data: action=${action}, actionID=${actionID}`, 
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
      'EVENT_ACTION_AUTH_FAILED', 
      `Event action failed - authentication error: ${error.message}`, 
      req
    );
    
    return res.status(error.statusCode).send({
      message: error,
      status: "fail",
    });
  }

  console.log(
    `Attempting Action ${action} From User: ${userID} on Event ${actionID}`
  );

  const roles = ["volunteer", "organizer", "admin"];
  if (roles.includes(roleType.role)) {
    try {
      let answer;
      let eventInfo;
      let targetUserInfo;

      // Get event and user info for logging
      try {
        const events = await dbConnection.getEvents(['approved', 'pending', 'rejected', 'ongoing', 'finished']);
        eventInfo = events.find(e => e.event_id === parseInt(actionID));
        
        if (targetUserID) {
          targetUserInfo = await dbConnection.getUserById(targetUserID);
        }
      } catch (err) {
        console.log(`Could not fetch event/user info for logging: ${err}`);
      }

      if (roleType.role === "admin") {
        console.log("Events Admin action");
        
        if (action === "approve") {
          // Get current status of the event
          const currentStatus = await dbConnection.getEventCurrentStatus(actionID);
          
          if (!currentStatus) {
            console.log(`Event ${actionID} not found in any status`);
            return res.status(404).send({
              message: "Event not found in any status",
              status: "fail",
            });
          }
          
          // Only allow approval from pending or rejected status
          if (currentStatus !== "pending" && currentStatus !== "rejected") {
            console.log(`Cannot approve event from ${currentStatus} status`);
            return res.status(400).send({
              message: `Cannot approve event from ${currentStatus} status`,
              status: "fail",
            });
          }
          
          answer = await dbConnection.updateEventStatus(
            actionID,
            "approved",
            currentStatus
          );
          
          if (answer) {
            await logEventStatusChange(
              userID, 
              eventInfo?.event_name || 'unknown', 
              actionID, 
              currentStatus, 
              'approved', 
              req
            );
          }
        }
        
        if (action === "reject") {
          // Get current status of the event
          const currentStatus = await dbConnection.getEventCurrentStatus(actionID);
          
          if (!currentStatus) {
            console.log(`Event ${actionID} not found in any status`);
            return res.status(404).send({
              message: "Event not found in any status",
              status: "fail",
            });
          }
          
          // Only allow rejection from pending or approved status
          if (currentStatus !== "pending" && currentStatus !== "approved") {
            console.log(`Cannot reject event from ${currentStatus} status`);
            return res.status(400).send({
              message: `Cannot reject event from ${currentStatus} status`,
              status: "fail",
            });
          }
          
          answer = await dbConnection.updateEventStatus(
            actionID,
            "rejected",
            currentStatus
          );
          
          if (answer) {
            await logEventStatusChange(
              userID, 
              eventInfo?.event_name || 'unknown', 
              actionID, 
              currentStatus, 
              'rejected', 
              req
            );
          }
        }
      }

      if (roleType.role === "volunteer") {
        console.log("Events Volunteer action");
        //TODO check event status
        //TODO check if user meets conditions (much later phase 2 or 3)

        if (action === "enroll") {
          answer = await dbConnection.decideUserEventStatus(
            actionID,
            userID,
            "vol_id_waiting_list",
            "waiting"
          );

          if (answer) {
            await dbconnection.addEventToUserList(
              userID,
              "signed_up_events",
              actionID
            ); // add to used list
            
            await logEventEnrollment(
              userID, 
              eventInfo?.event_name || 'unknown', 
              actionID, 
              'enrolled', 
              req
            );
          }
        }

        if (action === "unenroll") {
          // Remove user from event's waiting list and approved list
          answer = await dbConnection.removeUserFromEvent(actionID, userID);

          // Remove event from user's signed up events list
          if (answer) {
            await dbconnection.removeEventFromUserList(
              userID,
              "signed_up_events",
              actionID
            );
            
            await logEventEnrollment(
              userID, 
              eventInfo?.event_name || 'unknown', 
              actionID, 
              'unenrolled', 
              req
            );
          }
        }
      }

      if (roleType.role === "organizer") {
        console.log("Events Organizer action");

        if (action === "approve") {
          answer = await dbConnection.decideUserEventStatus(
            actionID,
            targetUserID,
            "vol_id",
            "approved"
          );
          
          if (answer) {
            await logVolunteerAssignment(
              userID, 
              targetUserID, 
              targetUserInfo?.username || 'unknown', 
              eventInfo?.event_name || 'unknown', 
              req
            );
          }
        }

        if (action === "reject") {
          answer = await dbConnection.decideUserEventStatus(
            actionID,
            targetUserID,
            "vol_id_waiting_list",
            "rejected"
          );
          
          if (answer) {
            await logActivity(
              userID, 
              'VOLUNTEER_REJECTED', 
              `Rejected volunteer ${targetUserInfo?.username || targetUserID} for event ${eventInfo?.event_name || actionID}`, 
              'INFO', 
              req
            );
          }
        }
      }

      // For all Users fav button Adds to fav list
      if (action === "fav") {
        const favList = await dbconnection.getUserEvents(
          userID,
          "fav_events"
        );

        if (favList.includes(Number(actionID))) {
          console.log("Event already in favorites, removing...");
          answer = await dbconnection.removeEventFromUserList(
            userID,
            "fav_events",
            actionID
          );
          
          if (answer) {
            await logActivity(
              userID, 
              'EVENT_UNFAVORITED', 
              `Removed event ${eventInfo?.event_name || actionID} from favorites`, 
              'INFO', 
              req
            );
          }
        } else {
          console.log("Event not in favorites, adding...");
          answer = await dbconnection.addEventToUserList(
            userID,
            "fav_events",
            actionID
          );
          
          if (answer) {
            await logActivity(
              userID, 
              'EVENT_FAVORITED', 
              `Added event ${eventInfo?.event_name || actionID} to favorites`, 
              'INFO', 
              req
            );
          }
        }
      }

      if (!answer) {
        const message = `action failed!! invalid action type`;
        console.log(message);
        
        await logError(
          userID, 
          'EVENT_ACTION_FAILED', 
          `Event action failed: ${action} on event ${actionID}`, 
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
          //TODO maybe make the system reload the Event table or refresh
        });
      }
    } catch (error) {
      console.error(`Error during action ${action} error:`, error);
      
      await logError(
        userID, 
        'EVENT_ACTION_ERROR', 
        `Error during event action ${action} on event ${actionID}: ${error.message}`, 
        req
      );
      
      res.status(500).send({
        message: "An internal server error occurred during Events actions.",
        status: "error",
      });
    }
  } else {
    const message = "User lacks permissions";
    console.log(message);
    
    await logSecurityEvent(
      userID, 
      'EVENT_ACTION_UNAUTHORIZED', 
      `Unauthorized event action attempt: ${action} by user with role ${roleType.role}`, 
      req
    );
    
    res.status(401).send({
      message: message,
      status: "error",
    });
  }
};

export default eventActions;
