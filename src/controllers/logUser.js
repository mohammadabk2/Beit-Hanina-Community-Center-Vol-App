import dbConnection from "../database/dbconnection.js";

const loginUser = (userName, hash) => {
  dbConnection.getUserByLogin(userName, hash);

  // Future implementation goes here...
  // (e.g., verifying password with bcrypt, signing token with jwt, etc.)
};

export default loginUser;
