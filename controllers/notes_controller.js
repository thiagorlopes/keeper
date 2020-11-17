const models = require("../models");
const Note = models.Note;

// Create and save a new note
exports.create = (req, res) => {

  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Please insert a title.",
    });
    return;
  }

  // Create a Note
  const note = {
    title: req.body.title,
    content: req.body.content,
    user_id: req.user.id,
    completed: req.user.completed
  };

  // Save Note in the database
  Note.create(note)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while creating Note.",
      });
    });
};

// Retrieve ALL notes
exports.findAll = (req, res) => {
  Note.findAll({
    where: {
      user_id: req.user.id
    }
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error while retrieving notes.",
    });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Note.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Note with id=${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Note.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Note updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Note with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating note with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Note.destroy({
    where: { id: id },
  })
    .then((num) => {
      console.log(`num: ${num}`);
      if (num === 1) {
        res.send({
          message: "Note successfully deleted.",
        });
      } else {
        res.send({
          message: `Cannot delete Note with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete tutorial with id=${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  const id = req.params.user_id;

  Note.destroy({
    where: { id: id },
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: nums + " Notes were successfully deleted." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while deleting all notes",
      });
    });
};
