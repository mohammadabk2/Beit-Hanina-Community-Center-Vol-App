import { Router } from "express";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import pingController from "./common/ping.js";
import exportEvents from "./common/export.js";

import logUserController from "./auth/login.js";
import changePassword from "./auth/changePassword.js";

import registerVolunteerController from "./Users/create.js";
import loadUsers from "./Users/load.js";
import LoadInfo from "./Users/Info.js";
import userActions from "./Users/actions.js";

import loadEvents from "./Events/load.js";
import createEvent from "./Events/create.js";
import eventActions from "./Events/actions.js";

const router = Router();

// --- API Routes ---
router.get("/ping", pingController);

router.post("/auth/login", logUserController);
router.post("/auth/change-password", changePassword);

router.post("/users/register", registerVolunteerController);
router.get("/users", loadUsers);
router.post("/users", userActions);
router.get("/users/Info", LoadInfo);

router.get("/events", loadEvents);
router.post("/events", createEvent);
router.post("/events/actions", eventActions);
router.get("/events/export", exportEvents);

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
