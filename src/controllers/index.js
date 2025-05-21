import { Router } from "express";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import pingController from "./common/ping.js";
import registerVolunteerController from "./Users/register.js";
import logUserController from "./auth/login.js";
import loadUsers from "./Users/load.js";
import userActions from "./Users/actions.js";
import loadEvents from "./Events/loadEvents.js";

const router = Router();

// --- API Routes ---
router.get("/ping", pingController);

router.post("/auth/login", logUserController);

router.post("/users/register", registerVolunteerController);
router.get("/users", loadUsers);
router.post("/users", userActions);

router.get("/events", loadEvents);

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
