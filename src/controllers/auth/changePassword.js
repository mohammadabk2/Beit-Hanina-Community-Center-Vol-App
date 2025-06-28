import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";
// import bcrypt from "bcrypt";
import { logPasswordChange, logError, logWarning, logSecurityEvent } from "../../utils/logger.js";

const changePassword = async (req, res) => {
  const { userID, action, newPassword } = req.body;

  if (!userID || !action || !newPassword) {
    const message = "Request body Failed.";
    console.log(message);
    
    await logWarning(
      userID, 
      'PASSWORD_CHANGE_MISSING_DATA', 
      'Password change attempt with missing data', 
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
      'PASSWORD_CHANGE_AUTH_FAILED', 
      `Password change failed - authentication error: ${error.message}`, 
      req
    );
    
    return res.status(error.statusCode).send({
      message: error,
      status: "fail",
    });
  }

  console.log(`Attempting password change ${action} From User: ${userID}`);

  try {
    let answer;
    let targetUser;

    // Get user info for logging
    try {
      targetUser = await dbConnection.getUserById(userID);
    } catch (err) {
      console.log("Could not fetch user info for logging");
    }

    // DEMO: Store password in clear text (for demonstration only)
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const passwordHash = await bcrypt.hash(newPassword, salt);
    
    // Use plain password for demo
    const passwordHash = newPassword;

    if (action === "password-change") {
      answer = await dbConnection.changePassword(userID, passwordHash);
      
      if (answer) {
        await logPasswordChange(
          userID, 
          targetUser?.username || 'unknown', 
          req
        );
      }
    }

    if (!answer) {
      const message = `action failed!! invalid action type`;
      console.log(message);
      
      await logError(
        userID, 
        'PASSWORD_CHANGE_FAILED', 
        `Password change failed for user: ${targetUser?.username || userID}`, 
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
      });
    }
  } catch (error) {
    console.error(`Error during action ${action} error:`, error);
    
    await logError(
      userID, 
      'PASSWORD_CHANGE_ERROR', 
      `Password change error: ${error.message}`, 
      req
    );
    
    res.status(500).send({
      message: "An internal server error occurred during password change.",
      status: "error",
    });
  }
};

export default changePassword;
