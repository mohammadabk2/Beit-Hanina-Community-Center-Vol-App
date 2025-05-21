import dbConnection from "../../database/dbconnection.js";
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library

const loadEvents = async (req, res) => {
  console.log("Loading Events from DB");

  const { userID, userRequest } = req.body;
  const authHeader = req.headers.authorization;

  if (!userID || !userRequest) {
    const message = "User Id or Request Failed.";
    console.log(message);
    return res.status(400).send({
      message: message,
      status: "fail",
    });
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const message = "Authorization header missing or invalid format.";
    console.log(message);
    return res.status(401).send({
      message: message,
      status: "fail",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the Bearer string

  if (!token) {
    const message = "Token not provided in the Authorization header.";
    console.log(message);
    return res.status(401).send({
      message: message,
      status: "fail",
    });
  }

  console.log(`Attempting load Events from DB for userId: ${userID}`);

  //TODO verify token and id
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(`decoded = ${decoded.id} actual = ${userID}`);
    if (decoded.id !== userID) {
      const message = "Unauthorized: Token does not match the requested user.";
      console.log(message);
      return res.status(403).send({
        message: message,
        status: "fail",
      });
    }

    const events = await dbConnection.getEvents("*");

    if (events && events.length > 0) {
      const allEvents = events.map((event) => ({
        id: event.event_id,
        name: event.event_name,
        birthDate: new Date(event.event_date).toISOString().split("T")[0],
        startTime: event.event_start,
        endTime: event.event_end,
        active: event.is_active,
        orgId: event.org_id,
        //TODO maybe add vol id ad waiting list
        maxSize: event.max_number_of_vol,
        currentSize: event.current_number_of_vol,
        location: event.event_location,
        description: event.event_description,
      }));

      const message = `Loading Events successful!`;
      console.log(message);
      res.status(200).send({
        message: message,
        status: "success",
        userData: allEvents,
      });
    } else {
      const message = `loading failed!! invalid query struct`;
      console.log(message);
      res.status(401).send({
        message: message,
        status: "fail",
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
export default loadEvents;
