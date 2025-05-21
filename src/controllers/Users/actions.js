import dbConnection from "../../database/dbconnection.js";
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library

const userActions = async (req, res) => {
  console.log("approve/reject/log users");

  const { userID, actionID, action, actionValue } = req.body;

  if (!userID || !actionID || !action || !actionValue) {
    const message = "Request body Failed.";
    console.log(message);
    return res.status(400).send({
      message: message,
      status: "fail",
    });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const message = "Authorization header missing or invalid format.";
    console.log(message);
    return res.status(401).send({
      message: message,
      status: "fail",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    const message = "Token not provided in the Authorization header.";
    console.log(message);
    return res.status(401).send({
      message: message,
      status: "fail",
    });
  }

  console.log(
    `Attempting Action ${action} From User: ${userID} on User ${actionID}`
  );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id !== userID) {
      const message = "Unauthorized: Token does not match the requested user.";
      console.log(message);
      return res.status(403).send({
        message: message,
        status: "fail",
      });
    }

    let answer;

    if (action === "approve" && actionValue === "NA") {
      console.log("approving User");
      answer = await dbConnection.createVolunteer(actionID);
    }

    if (action === "reject" && actionValue === "NA") {
      console.log("rejecting User");
      answer = await dbConnection.rejectUser(actionID)
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
};

export default userActions;
