const users = require("../controllers/users_controller.js");

var router = require("express").Router();

// Create a new user
router.post("/", users.create);

// Retrieve a note with id
router.get("/:id", users.findOne);

module.exports = router;