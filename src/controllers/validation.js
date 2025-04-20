// import dbConnection from "../database/dbconnection.js";
import usersValidation from "../database/validation/users.js";
// You can import jwt and bcrypt like this if needed later
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

const validation = (userData) => {
  validationErrors = {};

  for (const key in userData) {
    if (usersValidation.hasOwnProperty(key)) {
      const regex = usersValidation[key]; // Access the RegExp object directly
      const inputValue = userData[key]; // Get the corresponding input value

      if (inputValue !== undefined && !regex.test(inputValue)) {
        validationErrors[key] = `Invalid ${key} format.`;
      }
    }
  }
  return validationErrors;
};

export default validation;
