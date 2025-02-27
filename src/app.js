const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const controllers = require("./controllers/index");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

// Serve index.js as a module for frontend
app.get("/src/controllers/index.js", (req, res) => {
    res.type("application/javascript");
    res.sendFile(path.join(__dirname, "public/src/pages/index.js"));
});

// Use controllers (assuming backend API routes are in controllers/)
app.use(controllers);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
