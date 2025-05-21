import dbConnection from "../../database/dbconnection.js";
import jwt from "jsonwebtoken";

//TODO validation check for front end

const createEvent = async (req, res) => {
  console.log("create new event");

  const { userID, userData } = req.body;
  if (!userID || !userData) {
    return res.status(400).send({
      message: "User Id or Request Failed.",
      status: "fail",
    });
  }

  const requiredFields = [
    "eventName",
    "eventDate",
    "eventStartTime",
    "eventEndTime",
    "isActive",
    "orgId",
    "maxNumberOfVolunteers",
    "eventLocation",
    "eventDescription",
  ];
  for (const field of requiredFields) {
    if (!userData[field]) {
      return res.status(400).send({
        message: `Missing field: ${field}`,
        status: "fail",
      });
    }
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

  console.log(`Attempting to create new Event from user: ${userID}`);

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

    const answer = await dbConnection.addEvent(
      userData.eventName,
      userData.eventDate,
      userData.eventStartTime,
      userData.eventEndTime,
      userData.isActive,
      userData.orgId,
      userData.maxNumberOfVolunteers,
      userData.eventLocation,
      userData.eventDescription,
    );

    if (answer) {
      res.status(200).send({
        message: `Created Event successfully`,
        status: "success",
      });
    } else {
      res.status(503).send({
        message: "Database temporarily unavailable. Please try again later.",
        status: "error",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "An internal server error occurred during singUp.",
      status: "error",
    });
  }
};
export default createEvent;
