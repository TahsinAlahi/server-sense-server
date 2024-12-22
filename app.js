require("dotenv").config();
const cors = require("cors");
const express = require("express");
const createHttpErrors = require("http-errors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/jwt", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw createHttpErrors(400, "Email is required");
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(200)
      .json({ message: "Token issued successfully" });
  } catch (error) {
    next(error);
  }
});

app.use("/api/services", require("./routes/services.route"));
// app.use("/api/reviews", require("./routes/reviews.route"));

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
