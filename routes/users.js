const users = require("../controllers/users_controller.js");
const isLoggedIn = require("../config/helpers");

module.exports = function(app) {
  app.get("/users/current", users.current);

  app.post("/users/signup", users.signup);

  app.post("/users/login", users.login);

  app.get("/users/logout", isLoggedIn, users.logout);

  app.post("/users/forgot", users.forgot);

  app.post("/users/reset/:token", users.reset);
}
