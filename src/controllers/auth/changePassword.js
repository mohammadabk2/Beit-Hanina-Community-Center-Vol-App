import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
  const { userID, action, newPassword } = req.body;

  if (!userID || !action || !newPassword) {
    const message = "Request body Failed.";
    console.log(message);
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
    return res.status(error.statusCode).send({
      message: error,
      status: "fail",
    });
  }

  console.log(`Attempting password change ${action} From User: ${userID}`);

  try {
    let answer;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    if (action === "password-change") {
      answer = await dbConnection.changePassword(userID, passwordHash);
    }

    if (!answer) {
      const message = `action failed!! invalid action type`;
      console.log(message);
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
    res.status(500).send({
      message: "An internal server error occurred during login.",
      status: "error",
    });
  }
};

export default changePassword;
