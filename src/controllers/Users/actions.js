import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";

const userActions = async (req, res) => {
  console.log("approve/reject/log users");

  const { userID, actionID, action, actionValue } = req.body;

  // console.log(`${userID} , ${actionID} , ${action}, ${actionValue}`);

  if (!userID || !actionID || !action || !actionValue) {
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

  console.log(
    `Attempting Action ${action} From User: ${userID} on User ${actionID}`
  );

  if (roleType.role === "admin") {
    try {
      let answer;

      if (action === "approve" && actionValue === "NA") {
        console.log("approving User");
        answer = await dbConnection.createVolunteer(actionID);
      }

      if (action === "reject" && actionValue === "NA") {
        console.log("rejecting User");
        answer = await dbConnection.rejectUser(actionID);
      }

      if (action === "log-user") {
        console.log(`logging about User ${actionValue}`);
        answer = await dbConnection.addLog(actionID, actionValue);
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
          //TODO maybe make the system reload the user table or refresh
        });
      }
    } catch (error) {
      console.error(`Error during action ${action} error:`, error);
      res.status(500).send({
        message: "An internal server error occurred during login.",
        status: "error",
      });
    }
  } else {
    const message = "User lacks permissions";
    console.log(message);
    res.status(401).send({
      message: message,
      status: "error",
    });
  }
};

export default userActions;
