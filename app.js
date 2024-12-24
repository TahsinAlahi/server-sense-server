require("dotenv").config();
const cors = require("cors");
const express = require("express");
const createHttpErrors = require("http-errors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/jwt", require("./routes/jwt.route"));

app.use("/api/services", require("./routes/services.route"));
app.use("/api/reviews", require("./routes/reviews.route"));

app.use("*", (req, res, next) => {
  next(createHttpErrors(404, "Route not found"));
});

app.use((err, req, res, next) => {
  let errorCode = 500;
  let errorMessage = "Something went wrong";

  if (createHttpErrors.isHttpError(err)) {
    errorCode = err.status;
    errorMessage = err.message;
  }

  console.error(err);
  res.status(errorCode).json({ message: errorMessage });
});

module.exports = app;
