import dbConnection from "../../database/dbconnection.js";
import validateToken from "../common/validateToken.js";

const LoadInfo = async (req, res) => {
  console.log("Loading User Info");

  const { userID } = req.body;
  console.log(userID);
  if (!userID) {
    return res.status(400).send({
      message: "User Id Failed.",
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
    `Attempting To load User Info for User ${userID} and Role ${roleType.role}`
  );

  try {
    const userInfo = await dbConnection.loadUserInfo(userID, roleType.role);

    if (!userInfo) {
      return res.status(404).json({
        message: "User info not found or query returned no data.",
        status: "fail",
      });
    }

    return res.status(200).json({
      message: "User info loaded successfully.",
      status: "success",
      userData: userInfo,
    });
  } catch (error) {
    console.error("Error loading user info:", error);
    return res.status(500).json({
      message: "Internal server error while loading user info.",
      status: "error",
    });
  }
};
export default LoadInfo;
