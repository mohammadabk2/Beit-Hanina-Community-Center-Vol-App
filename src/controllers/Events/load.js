import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";

const formatEvents = (events, favoriteEventIds = []) =>
  events.map((event) => ({
    id: event.event_id,
    name: event.event_name,
    birthDate: new Date(event.event_date).toISOString().split("T")[0],
    startTime: event.event_start,
    endTime: event.event_end,
    active: event.is_active,
    orgId: event.org_id,
    maxSize: event.max_number_of_vol,
    currentSize: event.current_number_of_vol,
    location: event.event_location,
    description: event.event_description,
    isFavorite: favoriteEventIds.includes(event.event_id),
  }));

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

  if (!roles.includes(roleType.role)) {
    return res.status(403).send({
      message: "Unauthorized role",
      status: "fail",
    });
  }

  console.log(`Attempting load Events from DB for userId: ${userID}`);

  try {
    let answer;
    let response;

    console.log(`Loading on type ${type}`);

    switch (type) {
      case "events": {
        answer = await dbConnection.getEvents(userRequest);
        const favEventIds = await dbConnection.getUserEvents(userID, "fav_events");
        response = formatEvents(answer, favEventIds);
        break;
      }

      case "event-list":
        if (eventID) {
          response = await dbConnection.fetchVolunteerlist(
            eventID,
            userRequest
          );
        }
        break;

      case "org": {
        answer = await dbConnection.getEvents(userRequest);
        const filteredEvents = answer.filter((event) => event.org_id === Number(userID));
        const favEventIds = await dbConnection.getUserEvents(userID, "fav_events");
        response = formatEvents(filteredEvents, favEventIds);
        break;
      }

      case "fav": {
        answer = await dbConnection.getEvents(userRequest);
        console.log("User faved Events");

        const favEventIds = await dbConnection.getUserEvents(
          userID,
          "fav_events"
        );

        const filteredEvents = answer.filter((event) =>
          favEventIds.includes(event.event_id)
        );

        answer = filteredEvents;
        response = formatEvents(answer, favEventIds);
        break;
      }

      case "signed-up": {
        answer = await dbConnection.getEvents(userRequest);
        console.log("User called signed up Events");

        const signedUpEventIds = await dbConnection.getUserEvents(
          userID,
          "signed_up_events"
        );

        const favEventIds = await dbConnection.getUserEvents(
          userID,
          "fav_events"
        );

        const filteredEvents = answer.filter((event) =>
          signedUpEventIds.includes(event.event_id)
        );

        answer = filteredEvents;
        response = formatEvents(answer, favEventIds);
        break;
      }
      case "new": {
        answer = await dbConnection.getEvents(userRequest);
        const favEventIds = await dbConnection.getUserEvents(userID, "fav_events");
        response = formatEvents(answer, favEventIds);
        break;
      }

      default:
        return res.status(400).send({
          message: `Unknown request type: ${type}`,
          status: "fail",
        });
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
      const message = `There does not exist any events under this category ${userRequest}.`;
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
};
export default load;
