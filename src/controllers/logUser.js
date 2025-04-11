import dbConnection from "../database/dbconnection.js";

const loginUser = async (req, res) => {
  const { userName, hash } = req.body;
  if (!userName || !hash) {
    return res.status(400).send({
      message: "Username and password are required.",
      status: "fail",
    });
  }

  console.log(`Attempting login for user: ${userName}`);

  try {
    const user = await dbConnection.getUserByLogin(userName, hash); // Await the result
    if (user) {
      console.log(`Login successful for user: ${user.email}`);
      res.status(200).send({
        message: `Login successful! ${user.name} ${user.id}`,
        status: "success",
      });
    } else {
      console.log(`Login failed for user: ${userName}`);
      res.status(401).send({
        message: "Invalid username or password/hash.",
        status: "fail",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({
      message: "An internal server error occurred during login.",
      status: "error",
    });
  }
};
export default loginUser;
