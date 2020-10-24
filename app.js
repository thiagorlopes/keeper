const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// include routes file
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const notesRouter = require("./routes/notes");

const { timeStamp } = require("console");

const app = express();

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// setup database connection
const db = require("./models");
db.sequelize.sync();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// add routes to middleware stack
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/notes", notesRouter);

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
