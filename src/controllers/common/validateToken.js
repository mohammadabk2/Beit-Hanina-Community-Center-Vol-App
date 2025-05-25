import jwt from "jsonwebtoken";

const validateToken = async (req) => {
  const authHeader = req.headers.authorization;
  let userID = req.body.userID;
  if (!userID) {
    userID = req.query.userID;
  }
  let decoded;

  // Validate request format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Authorization header missing or invalid format.");
    error.statusCode = 401; // Custom property to carry status code
    throw error;
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the Bearer string

  if (!token) {
    const error = new Error("Token not provided in the Authorization header.");
    error.statusCode = 401;
    throw error;
  }

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    let numericUserIDFromQuery = parseInt(userID, 10);
    console.log(`decoded = ${decoded.id} actual = ${numericUserIDFromQuery}`);

    if (decoded.id !== numericUserIDFromQuery) {
      // Use the userID from the request here
      const error = new Error(
        "Unauthorized: Token does not match the requested user."
      );
      error.statusCode = 403;
      throw error;
    }

    return decoded;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    } else if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Authentication failed: Token has expired.";
      throw error;
    } else if (error.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Authentication failed: Invalid token.";
      throw error;
    } else {
      // General unexpected error
      error.statusCode = 500; // Internal Server Error for unhandled errors
      error.message = "An unexpected authentication error occurred.";
      throw error;
    }
  }
};

export default validateToken;
