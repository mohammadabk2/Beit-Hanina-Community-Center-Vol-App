import { Router } from "express";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import pingController from "./ping.js";
import registerController from "./register.js";
import logUserController from "./logUser.js";
// import getTitleController from "./getTitle.js";
// import authenticateController from "./authenticate.js";
// import { usersValidation } from "./validation.js";
// import {
//   client as clientErrorHandler,
//   server as serverErrorHandler,
// } from "./error.js";

const router = Router();

// --- API Routes ---
// Assigning the imported controllers/handlers
router.get("/ping", pingController);
router.post("/register", registerController);
router.post("/logUser", logUserController);
// router.get("/getTitle", getTitleController);
// router.get("/usersvalidation", usersValidation); // Use the imported named export
// router.post("/authenticate", authenticateController);

// --- Static File Serving for React ---
// Uses the imported 'express' and the calculated '__dirname'
router.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

// Catch-all route for client-side routing
router.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

// router.use(clientErrorHandler);
// router.use(serverErrorHandler);
export default router;
