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

module.exports = { getHomeServices };
