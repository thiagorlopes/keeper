const users = require("../controllers/users_controller.js");

module.exports = function(app) {
  app.get("/users/current", users.current);

  app.post("/users/signup", users.signup);

  app.post("/users/login", users.login);

  app.get("/users/logout", users.logout);
}
