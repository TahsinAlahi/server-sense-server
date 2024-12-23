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

async function getMyReviews(req, res, next) {
  try {
    const { email } = req.query;

    const myReviews = await reviewCollection.find({ email }).toArray();

    res.status(200).json(myReviews);
  } catch (error) {
    next(error);
  }
}

async function updateReview(req, res, next) {
  const { id } = req.params;
  try {
    if (!id) throw createHttpErrors(400, "Id is required");
    if (!ObjectId.isValid(id)) throw createHttpErrors(400, "Invalid id");
    const { review, rating } = req.body;
    const result = await reviewCollection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { review, rating } },
      { returnDocument: "after" }
    );

    if (!result) throw createHttpErrors(404, "Review not found");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  const { id } = req.params;
  try {
    if (!id) throw createHttpErrors(400, "Id is required");
    if (!ObjectId.isValid(id)) throw createHttpErrors(400, "Invalid id");
    const deletedReview = await reviewCollection.findOneAndDelete({
      _id: ObjectId.createFromHexString(id),
    });

    if (!deletedReview) throw createHttpErrors(404, "Review not found");
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { addNewReview, getMyReviews, updateReview, deleteReview };
