var router = require("express").Router();

router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to this application." });
});

module.exports = router;
