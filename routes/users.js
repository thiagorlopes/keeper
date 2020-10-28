const users = require("../controllers/users_controller.js");

var router = require("express").Router();

// Create a new user
router.post("/signup", users.create);

// Login user
router.post("/login", users.findOne)

module.exports = router;