import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";

const eventActions = async (req, res) => {
  console.log("Event Actions");

  const { userID, eventID, action } = req.body;

  if (!userID || !eventID || !action) {
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
    `Attempting Action ${action} From User: ${userID} on Event ${eventID}`
  );

  const roles = ["volunteer", "organizer", "admin"];
  if (roles.includes(roleType.role)) {
    try {
      let answer;

      if (roleType.role === "admin") {
        console.log("Events Admin action");
        if (action === "approve") {
          answer = dbConnection.updateEventStatus(
            eventID,
            "approved",
            "pending"
          );
        }
        if (action === "reject") {
          answer = dbConnection.updateEventStatus(
            eventID,
            "rejected",
            "pending"
          );
        }
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
          //TODO maybe make the system reload the Event table or refresh
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

export default eventActions;
