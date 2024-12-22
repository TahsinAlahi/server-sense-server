const { servicesCollection } = require("../database");
const createHttpErrors = require("http-errors");
const { ObjectId } = require("mongodb");

async function getHomeServices(req, res, next) {
  try {
    const services = await servicesCollection
      .aggregate([{ $sample: { size: 6 } }])
      .toArray();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
}

async function getAllServices(req, res, next) {
  try {
    const services = await servicesCollection.find().toArray();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
}

async function addNewServices(req, res, next) {
  try {
    const {
      serviceImage,
      serviceTitle,
      companyName,
      website,
      description,
      category,
      price,
      addedDate,
      userEmail,
    } = req.body;

    if (
      !serviceImage ||
      !serviceTitle ||
      !companyName ||
      !website ||
      !description ||
      !category ||
      !price ||
      !addedDate ||
      !userEmail
    )
      throw createHttpErrors(400, "All fields are required");

    const result = await servicesCollection.insertOne(req.body);

    res.status(201).json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    next(error);
  }
}

module.exports = { getHomeServices, addNewServices, getAllServices };
