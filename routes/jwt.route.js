const router = require("express").Router();
const jwt = require("jsonwebtoken");
const createHttpErrors = require("http-errors");

router.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw createHttpErrors(400, "Email is required");
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Token issued successfully" });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "Token deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
