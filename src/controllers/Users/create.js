import dbConnection from "../../database/dbconnection.js";
import validation from "../validation.js";
import bcrypt from "bcrypt";
import { logRegistration, logError, logWarning } from "../../utils/logger.js";

//TODO validation check for front end

const registerVolunteer = async (req, res) => {
  const userData = req.body;
  const errors = validation(userData);

  // const file_path = "../../../images"
  // req.imageFile

  if (Object.keys(errors).length > 0) {
    // Log validation errors
    await logWarning(
      null, 
      'REGISTRATION_VALIDATION_ERROR', 
      `Registration validation failed: ${JSON.stringify(errors)}`, 
      req
    );
    
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
      let userType;

      if (userData.type === "org") {
        console.log("adding an org");
        userType = "organizer";
        reg = await dbConnection.createOrganizer(
          userData.fullName,
          userData.address,
          userData.phoneNumber,
          userData.email,
          userData.username,
          passwordHash
        );
        
        if (reg) {
          // Log successful organizer registration
          await logRegistration(
            reg.id, 
            userData.username, 
            userType, 
            req
          );
        }
        
      } else if (userData.type === "vol") {
        console.log("adding a Volunteer");
        userType = "volunteer";
        reg = await dbConnection.createUser(
          "volunteer_waiting_list",
          userData.fullName,
          userData.birthDate,
          userData.sex,
          userData.phoneNumber,
          userData.email,
          userData.address,
          userData.insurance,
          userData.occupation,
          userData.customField,
          userData.idNumber,
          userData.username,
          passwordHash,
          userData.skills
        );
        
        if (reg) {
          // Log volunteer registration (waiting list)
          await logRegistration(
            null, // No user ID yet since they're in waiting list
            userData.username, 
            `${userType} (waiting list)`, 
            req
          );
        }
      }
      
      if (reg) {
        res.status(200).send({
          message: `Signed up successfully`,
          status: "success",
        });
      } else {
        // Log registration failure
        await logError(
          null, 
          'REGISTRATION_FAILED', 
          `Registration failed for user: ${userData.username}, type: ${userData.type}`, 
          req
        );
        
        res.status(503).send({
          message: "Database temporarily unavailable. Please try again later.",
          status: "error",
        });
      }
    } catch (error) {
      console.log(error);
      
      // Log registration error
      await logError(
        null, 
        'REGISTRATION_ERROR', 
        `Registration error for user: ${userData.username} - ${error.message}`, 
        req
      );
      
      res.status(500).send({
        message: "An internal server error occurred during singUp.",
        status: "error",
      });
    }
  }
};

export default registerVolunteer;
