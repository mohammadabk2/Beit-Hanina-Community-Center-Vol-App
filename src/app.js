const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
// const controllers = require("./src/controllers");
const controllers = require("./controllers");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from 'client/build'
app.use(express.static(path.join(__dirname, "../client/build")));

// API routes
app.use("/api", controllers);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});