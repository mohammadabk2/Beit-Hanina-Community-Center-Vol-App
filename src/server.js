import express from "express";
import path from "path";
import bodyParser from "body-parser";
import compression from "compression";
// import controllers from "./controllers";
import controllers from "./controllers/index.js";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API routes
app.use(cors({
  origin: 'http://localhost:3000', // IMPORTANT: Replace with the exact URL of your client-side application.
                                  // For development, if you need it to work immediately without worrying about client port, you *could* temporarily use '*', but be aware of security.
                                  // Example: origin: '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Standard methods, include OPTIONS for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers your client is allowed to *send*
  exposedHeaders: ['Authorization'], // <--- THIS IS WHAT YOU NEED! It tells the browser to allow client-side JS to read the 'Authorization' response header.
  credentials: true // Important if you were sending cookies or Authorization headers with your requests
})); //TODO enabled for testing. DELETE LATER AND REFRACTOR
app.use("/api", controllers);

// Serve static files from 'client/build'
app.use(express.static(path.join(__dirname, "../client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});