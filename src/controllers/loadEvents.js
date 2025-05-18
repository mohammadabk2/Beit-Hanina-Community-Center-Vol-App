import dbConnection from "../database/dbconnection.js";

const loadEvents = async (req, res) => {
  console.log("Loading Events from DB");
//   const userData = req.body;

  const { userID, userRequest } = req.body;
  if (!userID || !userRequest) {
    return res.status(400).send({
      message: "User Id or Request Failed.",
      status: "fail",
    });
  }

  console.log(`Attempting load Events from DB for userId: ${userID}`);

  //TODO verify token and id
  try {
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

      res.status(200).send({
        message: `Loading Events successful!`,
        status: "success",
        userData: allEvents,
      });
    } else {
      console.log(`loading failed!!`);
      res.status(401).send({
        message: "invalid query struct",
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
