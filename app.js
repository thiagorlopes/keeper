const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const createError = require("http-errors");
const path = require("path");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// setup passport session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// allows serving of 3rd party origins (Cross-Origin Resource Sharing)
const client = process.env.CLIENT_URL || "http://localhost:3000";
var corsOptions = {
  origin: client,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "device-remember-token",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
};

app.use(cors(corsOptions));

// load models
const models = require("./models");

// load routes
indexRoute = require("./routes/index")(app);
notesRoute = require("./routes/notes")(app);
usersRoute = require("./routes/users")(app, passport);

// load passport strategies
require("./config/passport")(passport, models.user);

// sync database
models.sequelize.sync({force: true});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
