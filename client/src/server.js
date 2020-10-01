const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set up middleware
app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// TODO - Connect to Database

//------------------Requests targeting all notes------------------//
app
  .route("/notes")

  .get(function (req, res) {
    console.log("Get all articles");
  })

  .post(function (req, res) {
    console.log("Added a new note");
  })

  .delete(function (req, res) {
    console.log("Deleted all notes");
  });

//------------------Requests targeting a specific note------------------//
app
  .route("notes/:noteTitle")

  .get(function (req, res) {
    console.log("Find one article");
  })

  .put(function (req, res) {
    console.log("Updated selected article");
  })

  .patch(function (req, res) {
    console.log("Updated selected article");
  })

  .delete(function (req, res) {
    console.log("Deleted corresponding note");
  });

// Use port 3000 unless there is already another port set
var port = process.env.PORT || 3000;

app.listen(port, function (req, res) {
  console.log("Server started on port " + port);
});
