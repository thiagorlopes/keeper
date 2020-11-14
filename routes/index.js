const isLoggedIn = require("../config/helpers");

module.exports = function(app) {
  app.get("/", isLoggedIn, function (req, res, next) {
    res.json({ message: "Welcome to this application." });
  });
}
