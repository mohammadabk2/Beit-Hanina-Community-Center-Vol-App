import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";

const loadUsers = async (req, res) => {
  console.log("Loading users from DB");

  const { userID, userRequest, tableName } = req.query;
  console.log(userRequest);
  console.log(tableName);

  if (!userID || !tableName) {
    return res.status(400).send({
      message: "User Id or Request Failed.",
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
    `Attempting load Users from DB for userId: ${userID} for Table ${tableName}`
  );

  const safeDateOnly = (date) => {
    try {
      return new Date(date).toISOString().split("T")[0];
    } catch (err) {
      console.log(err);
      return null; // Or return "" if you want empty string instead
    }
  };

  const roles = ["organizer", "admin"];
  if (roles.includes(roleType.role)) {
    try {

      // console.log(users); // !testing only

      let allUsers;

      if (roleType.role === "admin") {
        const users = await dbConnection.getUsers(roleType.role, tableName);
        allUsers = users.map((user) => ({
          id: user.id,
          name: user.name,
          birthDate: safeDateOnly(user.birth_date),
          sex: user.sex,
          phoneNumber: user.phone_number,
          email: user.email,
          address: user.address,
          insurance: user.insurance,
          idNumber: user.id_number,
          userName: user.username,
          logs: user.logs,
        }));
      }

      if (roleType.role === "organizer" && Array.isArray(userRequest) && userRequest.length > 0) {
        // userRequest ind 0 is event id, 1 is array name
        const users = await dbConnection.fetchEventVolunteers(userRequest[0], userRequest[1]);
        console.log("Raw users data from DB:", users); // Debug log
        allUsers = users.map((user) => ({
          id: user.user_id,
          name: user.name,
          sex: user.sex,
          phoneNumber: user.phone_number,
        }));
        console.log("Mapped users data:", allUsers); // Debug log
      }
      if (allUsers === null) {
        res.status(402).semd({
          message: `Request body error`,
          status: "fail",
        });
      }
      res.status(200).send({
        message: `Loading users successful!`,
        status: "success",
        userData: allUsers,
      });
    } catch (error) {
      console.error("Error during loading:", error);
      res.status(500).send({
        message: "An internal server error occurred during login.",
        status: "error",
      });
    }
  } else {
    console.log(`Invalid User Role`);
    res.status(403).send({
      message: "Invalid User Role",
      status: "fail",
    });
  }
};
export default loadUsers;
