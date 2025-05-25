import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";

const load = async (req, res) => {
  console.log("Loading Events from DB");

  const { userID, userRequest, type, eventID } = req.query;

  console.log(
    `userID:${userID}, userRequest:${userRequest}, type:${type} eventID:${eventID} `
  );

  if (!userID || !userRequest || !type) {
    const message = "User Id or Request Failed.";
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

  const roles = ["volunteer", "organizer", "admin"];
  if (roles.includes(roleType.role)) {
    console.log(`Attempting load Events from DB for userId: ${userID}`);

    //TODO verify token and id
    try {
      let answer;
      let response;

      if (type === "events") {
        answer = await dbConnection.getEvents(userRequest);

        if (answer && answer.length > 0) {
          response = answer.map((event) => ({
            id: event.event_id,
            name: event.event_name,
            birthDate: new Date(event.event_date).toISOString().split("T")[0],
            startTime: event.event_start,
            endTime: event.event_end,
            active: event.is_active,
            orgId: event.org_id,
            //TODO Implement different data return for vol/org/admin
            maxSize: event.max_number_of_vol,
            currentSize: event.current_number_of_vol,
            location: event.event_location,
            description: event.event_description,
          }));
        }
      }

      if (type === "event-list" && eventID) {
        answer = await dbConnection.fetchVolunteerlist(eventID, userRequest);
        response = answer;
      }

      if (answer && response) {
        const message = `Loading ${type} successful!`;
        console.log(message);
        res.status(200).send({
          message: message,
          status: "success",
          userData: response,
        });
      } else {
        const message = `There does not exist any events under this category.`;
        console.log(message);
        res.status(200).send({
          message: message,
          status: "success",
        });
      }
    } catch (error) {
      console.error("Error during loading:", error);
      res.status(500).send({
        message: "An internal server error occurred during login.",
        status: "error",
      });
    }
  }
};
export default load;
