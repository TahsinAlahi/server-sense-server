const router = require("express").Router();
const reviewsController = require("../controllers/reviews.controller");

const jwtVerify = require("../middlewares/jwt.middleware");

router.post("/new-review", jwtVerify, reviewsController.addNewReview);
router.get("/my-reviews", jwtVerify, reviewsController.getMyReviews);

module.exports = router;
