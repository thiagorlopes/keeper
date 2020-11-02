const notes = require("../controllers/notes_controller.js");

module.exports = function(app) {
  // Create a new note
  app.post("/notes", notes.create);

  // Retrieve all notes
  app.get("/notes", notes.findAll);

  // Retrieve a note with id
  app.get("/notes/:id", notes.findOne);

  // Update a note with id
  app.put("/notes/:id", notes.update);

  // Delete all notes
  app.delete("/notes", notes.deleteAll);

  // Delete a note with id
  app.delete("/notes/:id", notes.delete);
}
