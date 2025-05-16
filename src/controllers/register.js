import dbConnection from "../database/dbconnection.js";
import validation from "./validation.js";
import bcrypt from "bcrypt";

//TODO validation check for front end

const registerVolunteer = async (req, res) => {
  const userData = req.body;
  const errors = validation(userData);

  if (Object.keys(errors).length > 0) {
    res.status(400).send({
      message: "Invalid registration data.",
      status: "error",
    });
  } else {
    //TODO add a check when the request is made so it adds based on type a vol or an org
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(userData.password, salt);

      let reg;

      if (userData.type === "org") {
        console.log("adding an org");
        reg = await dbConnection.createOrganizer(
          userData.orgName,
          userData.orgAddress,
          userData.orgAdmin,
          userData.orgPhoneNumber,
          userData.orgEmail,
          userData.orgUserName,
          passwordHash
        );
      } else if (userData.type === "vol") {
        console.log("adding a Volunteer");
        reg = await dbConnection.createVolunteer(
          "volunteer_waiting_list",
          userData.fullName,
          userData.birthDate,
          userData.sex,
          userData.phoneNumber,
          userData.email,
          userData.address,
          userData.insurance,
          userData.idNumber,
          userData.username,
          passwordHash
        );
      }
      if (reg) {
        res.status(200).send({
          message: `Signed up successfully`,
          status: "success",
        });
      } else {
        res.status(503).send({
          message: "Database temporarily unavailable. Please try again later.",
          status: "error",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "An internal server error occurred during singUp.",
        status: "error",
      });
    }
  }
};
export default registerVolunteer;
