// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const controllers = require("./controllers/index");
const path = require("path");

//TODO decide what port to use for this
require("dotenv").config({ path: path.join(__dirname, "../.env") });

app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(controllers);

app.listen(3000, () => {
    console.log("Listening on port 3000");
})