const notes = require("../controllers/notes_controller.js");

var router = require("express").Router();

// Create a new note
router.post("/", notes.create);

// Retrieve all notes
router.get("/", notes.findAll);

// Retrieve a note with id
router.get("/:id", notes.findOne);

// Update a note with id
router.put("/:id", notes.update);

// Delete all notes
router.delete("/", notes.deleteAll);

// Delete a note with id
router.delete("/:id", notes.delete);

module.exports = router;
