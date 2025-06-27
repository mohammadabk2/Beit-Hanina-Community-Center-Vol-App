import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";
import { logEventCreation, logError, logWarning, logSecurityEvent } from "../../utils/logger.js";

//TODO validation check for front end

const createEvent = async (req, res) => {
  console.log("create new event");

  const { userID, userData } = req.body;
  if (!userID || !userData) {
    await logWarning(
      userID, 
      'EVENT_CREATE_MISSING_DATA', 
      'Event creation attempt with missing userID or userData', 
      req
    );
    
    return res.status(400).send({
      message: "User Id or Request Failed.",
      status: "fail",
    });
  }

  console.log("checking data");
  const requiredFields = [
    "eventName",
    "eventDate",
    "eventStartTime",
    "eventEndTime",
    "maxNumberOfVolunteers",
    "eventLocation",
    "eventDescription",
  ];
  
  for (const field of requiredFields) {
    if (userData[field] === undefined || userData[field] === null) {
      console.log(`field Missing:${field}`);
      
      await logWarning(
        userID, 
        'EVENT_CREATE_VALIDATION_ERROR', 
        `Event creation validation failed - missing field: ${field}`, 
        req
      );
      
      return res.status(400).send({
        message: `Missing field: ${field}`,
        status: "fail",
      });
    }
  }

  console.log("check role");
  let roleType;
  try {
    roleType = await validateToken(req);
    console.log(`role type: ${roleType.role}`);
  } catch (error) {
    console.log(error);
    
    await logSecurityEvent(
      userID, 
      'EVENT_CREATE_AUTH_FAILED', 
      `Event creation failed - authentication error: ${error.message}`, 
      req
    );
    
    return res.status(error.statusCode).send({
      message: error,
      status: "fail",
    });
  }

  const roles = ["organizer", "admin"];
  if (roles.includes(roleType.role)) {
    console.log(`Attempting to create new Event from user: ${userID}`);

    try {
      const answer = await dbConnection.addEvent(
        userData.eventName,
        userData.eventDate,
        userData.eventStartTime,
        userData.eventEndTime,
        userData.orgId,
        userData.maxNumberOfVolunteers,
        userData.eventDescription,
        userData.eventLocation
      );

      if (answer) {
        // Log successful event creation
        await logEventCreation(
          userID, 
          userData.eventName, 
          answer.event_id || 'unknown', 
          req
        );
        
        res.status(200).send({
          message: `Created Event successfully`,
          status: "success",
        });
      } else {
        // Log event creation failure
        await logError(
          userID, 
          'EVENT_CREATE_FAILED', 
          `Event creation failed for: ${userData.eventName}`, 
          req
        );
        
        res.status(503).send({
          message: "Database temporarily unavailable. Please try again later.",
          status: "error",
        });
      }
    } catch (error) {
      console.log(error);
      
      // Log event creation error
      await logError(
        userID, 
        'EVENT_CREATE_ERROR', 
        `Event creation error for: ${userData.eventName} - ${error.message}`, 
        req
      );
      
      res.status(500).send({
        message: "An internal server error occurred during event creation.",
        status: "error",
      });
    }
  } else {
    // Log unauthorized event creation attempt
    await logSecurityEvent(
      userID, 
      'EVENT_CREATE_UNAUTHORIZED', 
      `Unauthorized event creation attempt by user with role: ${roleType.role}`, 
      req
    );
    
    res.status(403).send({
      message: "Insufficient permissions to create events.",
      status: "fail",
    });
  }
};

export default createEvent;
