import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";

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

  const roles = ["organizer", "admin"];
  if (roles.includes(roleType.role)) {
    console.log(`Attempting to create new Event from user: ${userID}`);

    try {
      const answer = await dbConnection.addEvent(
        userData.eventName,
        userData.eventDate,
        userData.eventStartTime,
        userData.eventEndTime,
        userData.isActive,
        userData.orgId,
        userData.maxNumberOfVolunteers,
        userData.eventLocation,
        userData.eventDescription
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
  }
};
export default createEvent;
