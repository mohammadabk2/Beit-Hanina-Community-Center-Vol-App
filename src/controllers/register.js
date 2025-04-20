import dbConnection from "../database/dbconnection.js";
import validation from "./validation.js";
import bcrypt from "bcrypt";

//TODO validation check for front end

const registerUser = async (req, res) => {
  const userData = {
    fullName,
    birthDate,
    sex,
    phoneNumber,
    email,
    address,
    insurance,
    idNumber,
    username,
    password,
  };

  userData = req.body;
  const errors = validation(userData);
  if (Object.keys(errors).length > 0) {
    res.status(400).send({
      message: "Invalid registration data.",
      status: "error",
    });
  } else {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(password, salt);

      const reg = await dbConnection.createUser(
        fullName,
        birthDate,
        sex,
        phoneNumber,
        email,
        address,
        insurance,
        idNumber,
        username,
        passwordHash
      );
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
        message: "An internal server error occurred during login.",
        status: "error",
      });
    }
  }
};
export default registerUser;