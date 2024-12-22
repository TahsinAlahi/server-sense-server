require("dotenv").config();
const cors = require("cors");
const express = require("express");
const createHttpErrors = require("http-errors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

  res.status(errorCode).json({ message: errorMessage });
});

module.exports = app;
