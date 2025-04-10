import dbConnection from "../database/dbconnection.js";

// You can import jwt and bcrypt like this if needed later
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

const loginUser = (userName, hash) => {
  dbConnection.getUserByLogin(userName, hash);

  // Future implementation goes here...
  // (e.g., verifying password with bcrypt, signing token with jwt, etc.)
};

export default loginUser;
