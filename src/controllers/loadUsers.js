import dbConnection from "../database/dbconnection.js";

const loadUsers = async (req, res) => {
  console.log("Loading users from DB");

  const { userID, userRequest, tableName } = req.body;
  if (!userID || !userRequest || !tableName) {
    return res.status(400).send({
      message: "User Id or Request Failed.",
      status: "fail",
    });
  }

  console.log(`Attempting load Uers from DB for userId: ${userID} for Table ${tableName}`);

  //TODO verify id as a correct role
  try {
    const users = await dbConnection.getUsers(tableName, "*");

    if (users && users.length > 0) {
      console.log(users); // !testing only

      const allUserData = users.map((user) => ({
        id: user.id,
        name: user.name,
        birthDate: new Date(user.birth_date).toISOString().split('T')[0],
        sex: user.sex,
        phoneNumber: user.phone_number,
        email: user.email,
        address: user.address,
        insurance: user.insurance,
        idNumber: user.id_number,
        userName: user.username,
        logs: user.logs,
      }));

      res.status(200).send({
        message: `Loading users successful!`,
        status: "success",
        userData: allUserData,
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
export default loadUsers;
