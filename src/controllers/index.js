// src/controllers/index.js (Converted to ESM)

// --- Core Imports ---
import { Router } from "express"; // Use named import for Router
import express from "express"; // Import express itself for static middleware
import path from "path";

// --- __dirname Replacement for ES Modules ---
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Route Handler Imports (with .js extension required in ESM) ---
// Assuming these files use 'export default functionName;'
// import pingController from "./ping.js";
// import getTitleController from "./getTitle.js";
// import authenticateController from "./authenticate.js";
// import registerController from "./register.js";
// import logUserController from "./logUser.js";

// Assuming validation.js uses 'export const usersValidation = ...;'
// import { usersValidation } from "./validation.js";

// Assuming error.js uses 'export const client = ...; export const server = ...;'
// Using 'as' to rename imports to avoid potential naming conflicts if needed
// import {
//   client as clientErrorHandler,
//   server as serverErrorHandler,
// } from "./error.js";

// --- Router Setup ---
const router = Router();

// --- API Routes ---
// Assigning the imported controllers/handlers
// router.get("/api/ping", pingController);
// router.get("/api/getTitle", getTitleController);
// router.get("/api/usersvalidation", usersValidation); // Use the imported named export
// router.post("/api/authenticate", authenticateController);
// router.post("/api/register", registerController);
// router.get("/api/logUser", logUserController);

// --- Static File Serving for React ---
// Uses the imported 'express' and the calculated '__dirname'
router.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

// Catch-all route for client-side routing
router.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

// --- Error Handling Middleware ---
// Assigning the imported error handlers
// router.use(clientErrorHandler);
// router.use(serverErrorHandler);

// --- Export the Router ---
// Replace 'module.exports = router;' with 'export default router;'
export default router;
