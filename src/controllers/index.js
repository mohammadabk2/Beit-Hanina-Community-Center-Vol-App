const { Router } = require("express");
const express = require("express");
const router = Router();
const path = require("path");

router.get("/api/ping", require("./ping.js"));
router.get("/api/getTitle", require("./getTitle.js"));
router.get("/api/usersvalidation", require("./validation").usersValidation);
router.post("/api/authenticate", require("./authenticate"));
router.post("/api/register", require("./register"));
router.get("/api/logUser", require("./logUser"));

//For React:

router.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

router.get("*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "client",
      "build",
      "index.html"
    )
  );
});

router.use(require("./error.js").client);
router.use(require("./error.js").server);

module.exports = router;
