const jwt = require("jsonwebtoken");
const createHttpErrors = require("http-errors");

function jwtVerify(req, res, next) {
  try {
    const token = req?.cookies?.token;
    if (!token) throw createHttpErrors(401, "Unauthorized, no token found");
    if (!req?.query?.email) throw createHttpErrors(400, "Email is required");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw createHttpErrors(401, "Unauthorized");
      if (decoded.email !== req.query.email)
        throw createHttpErrors(403, "Forbidden: Email mismatch");
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
}

module.exports = jwtVerify;
