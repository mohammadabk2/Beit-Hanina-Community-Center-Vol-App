import dbConnection from "../database/dbconnection.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).send({
      message: "Username and password are required.",
      status: "fail",
    });
  }

  console.log(`Attempting login for user: ${userName}`);

  try {
    const storedHash = await dbConnection.getUserHash(userName); // Await the result
    //TODO register isnt setup yet
    //! will always fail
    const isPasswordMatch = await bcrypt.compare(
      password,
      storedHash.password_hash
    ); // hash the password and compare to the stored hash

    if (isPasswordMatch) {
      console.log(`Login successful for user: ${userName}`);
      res.status(200).send({
        message: `Login successful! ${userName} ${storedHash.id}`,
        status: "success",
        userData: {
          // Add a dedicated object for user data
          id: storedHash.id,
          role: storedHash.role, // Include the user role
        },
      });
    } else {
      console.log(`Login failed for user: ${userName}`);
      res.status(401).send({
        message: "Invalid username or password.",
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
