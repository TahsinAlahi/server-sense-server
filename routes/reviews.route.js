const router = require("express").Router();
const reviewsController = require("../controllers/reviews.controller");

const jwtVerify = require("../middlewares/jwt.middleware");

router.post("/new-review", jwtVerify, reviewsController.addNewReview);

module.exports = router;
