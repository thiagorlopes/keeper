const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Please insert a username.",
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while creating User.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.userId;

  Note.findByPk(userId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + userId,
      });
    });
};
