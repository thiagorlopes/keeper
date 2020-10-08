const db = require("../models");
const Note = db.notes;
const Op = db.Sequelize.Op;

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
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLIke]: "%${title$" } } : null;

  Note.findAll({ where: condition })
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
        message: "Error retrieving Note with id=" + id,
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
          message: "Cannot update Note with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Note with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Note.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Note successfully deleted.",
        });
      } else {
        res.send({
          message: "Cannot delete Note with id=${id}",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete tutorial with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Note.destroy({
    where: {},
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
