// // src/controllers/index.js (Converted to ESM)

// // Change require to import
// import { Router } from "express"; // Use named import for Router
// import express from "express"; // Import express itself if needed for static middleware
// import path from "path";

// // You'll need to convert these required files as well,
// // or use dynamic import/createRequire within this file if they *must* remain CJS.
// // Assuming they are converted or can be imported directly:
// import pingController from "./controllers/ping.js";
// import getTitleController from "./controllers/getTitle.js";
// import { usersValidation } from "./controllers/validation.js"; // Use named import if validation.js uses named export
// import authenticateController from "./controllers/authenticate.js";
// import registerController from "./controllers/register.js";
// import logUserController from "./controllers/logUser.js";
// import { client as clientError, server as serverError } from "./controllers/error.js"; // Use named imports

// // Need __dirname replacement in ESM
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const router = Router();

// // --- Routes ---
// router.get("/api/ping", pingController); // Assuming pingController is the default export of ping.js
// router.get("/api/getTitle", getTitleController); // Assuming getTitleController is the default export of getTitle.js
// router.get("/api/usersvalidation", usersValidation); // Using the imported named export
// router.post("/api/authenticate", authenticateController); // Assuming default export
// router.post("/api/register", registerController); // Assuming default export
// router.get("/api/logUser", logUserController); // Assuming default export

// // --- Static Files ---
// // Ensure express is imported if you use express.static here
// router.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

// router.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "..", "..", "client", "build", "index.html")
//   );
// });

// // --- Error Handlers ---
// router.use(clientError); // Use the imported named export
// router.use(serverError); // Use the imported named export

// // --- Change module.exports to export default ---
// export default router;
