const notes = require("../controllers/notes_controller.js");
const isLoggedIn = require("../config/helpers");

module.exports = function(app) {
  // Create a new note
  app.post("/notes", isLoggedIn, notes.create);

  // Retrieve all notes
  app.get("/notes", isLoggedIn, notes.findAll);

  // Retrieve a note with id
  app.get("/notes/:id", isLoggedIn, notes.findOne);

  // Update a note with id
  app.put("/notes/:id", isLoggedIn, notes.update);

  // Delete all notes
  app.delete("/notes", isLoggedIn, notes.deleteAll);

  // Delete a note with id
  app.delete("/notes/:id", isLoggedIn, notes.delete);
}
