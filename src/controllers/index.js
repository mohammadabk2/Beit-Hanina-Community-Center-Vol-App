import { Router } from "express";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import pingController from "./ping.js";
import registerController from "./register.js";
import logUserController from "./logUser.js";
import loadUsers from "./loadUsers.js";

const router = Router();

// --- API Routes ---
router.get("/ping", pingController);
router.post("/users/register", registerController);
router.get("/users",loadUsers);
router.post("/auth/login", logUserController);

// --- Static File Serving for React --- //! might turn off
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
