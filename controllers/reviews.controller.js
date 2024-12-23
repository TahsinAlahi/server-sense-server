const { ObjectId } = require("mongodb");
const { reviewCollection } = require("../database");
const createHttpErrors = require("http-errors");

async function addNewReview(req, res, next) {
  try {
    const { review, rating, serviceId } = req.body;
    const { email } = req.query;

    if (!email || !review || !rating || !serviceId)
      throw createHttpErrors(400, "All fields are required");

    const date = new Date();
    const addedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    const newReview = {
      review,
      rating,
      serviceId: new ObjectId(serviceId),
      email,
      addedDate,
    };

    const result = await reviewCollection.insertOne(newReview);

    res.status(201).json({ ...newReview, _id: result.insertedId });
  } catch (error) {
    next(error);
  }
}

module.exports = { addNewReview };
