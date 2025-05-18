import dbConnection from "../database/dbconnection.js";

// You can import jwt and bcrypt like this if needed later
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

const auth = (userName, hash) => {
  dbConnection.getUserByLogin(userName, hash);
};

export default auth;
