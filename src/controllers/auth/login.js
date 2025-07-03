import dbConnection from "../../database/dbconnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { logLogin, logError, logSuspiciousActivity } from "../../utils/logger.js";

dotenv.config();

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const loginUser = async (req, res) => {
  console.log("User login started");
  const { userName, password } = req.body;
  
  if (!userName || !password) {
    await logSuspiciousActivity(
      'LOGIN_MISSING_CREDENTIALS', 
      'Login attempt with missing username or password', 
      req
    );
    return res.status(400).send({
      message: "Username and password are required.",
      status: "fail",
    });
  }

  console.log(`Attempting login for user: ${userName}`);

  try {
    const response = await dbConnection.getUserHash(userName);
    
    if (!response) {
      // Log failed login attempt for non-existent user
      await logLogin(null, userName, false, req);
      await logSuspiciousActivity(
        'LOGIN_INVALID_USER', 
        `Login attempt for non-existent user: ${userName}`, 
        req
      );
      return res.status(401).send({
        message: "Invalid username or password.",
        status: "fail",
      });
    }

    // prod
    const isPasswordMatch = await bcrypt.compare(
      password,
      response.password_hash
    ); // hash the password and compare to the stored hash

    if (isPasswordMatch) {
      console.log(`Login successful for user: ${userName}`);
      
      // Log successful login
      await logLogin(response.id, userName, true, req);

      const token = generateToken(response.id, response.role);
      res.header('Authorization', `Bearer ${token}`).status(200).send({
        message: `Login successful! ${userName} ${response.id}`,
        status: "success",
        userData: {
          // Add a dedicated object for user data
          id: response.id,
          role: response.role, // Include the user role
        },
      });
    } else {
      console.log(`Login failed for user: ${userName}`);
      
      // Log failed login attempt
      await logLogin(response.id, userName, false, req);
      
      res.status(401).send({
        message: "Invalid username or password.",
        status: "fail",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    
    // Log login error
    await logError(null, 'LOGIN_ERROR', error, req);
    
    res.status(500).send({
      message: "An internal server error occurred during login.",
      status: "error",
    });
  }
};

export default loginUser;
