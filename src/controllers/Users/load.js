import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";

const loadUsers = async (req, res) => {
  console.log("Loading users from DB");

  const { userID, userRequest, tableName } = req.query;
  if (!userID || !userRequest || !tableName) {
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
    `Attempting load Uers from DB for userId: ${userID} for Table ${tableName}`
  );

  const safeDateOnly = (date) => {
    try {
      return new Date(date).toISOString().split("T")[0];
    } catch (err) {
      return null; // Or return "" if you want empty string instead
    }
  };

  const roles = ["organizer", "admin"];
  if (roles.includes(roleType.role)) {
    try {
      const users = await dbConnection.getUsers(roleType.role, tableName);

      if (users && users.length > 0) {
        // console.log(users); // !testing only

        let allUsers;

        if (roleType.role === "admin") {
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

        if (roleType.role === "organizer") {
          allUsers = users.map((user) => ({
            id: user.id,
            name: user.name,
            birthDate: new Date(user.birth_date).toISOString().split("T")[0],
            sex: user.sex,
            phoneNumber: user.phone_number,
          }));
        }

        res.status(200).send({
          message: `Loading users successful!`,
          status: "success",
          userData: allUsers,
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
  }
};
export default loadUsers;
