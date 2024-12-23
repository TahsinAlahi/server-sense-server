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

async function getServiceById(req, res, next) {
  const { id } = req.params;
  try {
    if (!id) throw createHttpErrors(400, "Id is required");
    if (!ObjectId.isValid(id)) throw createHttpErrors(400, "Invalid id");
    const service = await servicesCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    if (!service) throw createHttpErrors(404, "Service not found");
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
}

async function updateService(req, res, next) {
  const { id } = req.params;

  try {
    if (!id) throw createHttpErrors(400, "Id is required");
    if (!ObjectId.isValid(id))
      throw createHttpErrors(400, "Invalid service id");

    const {
      serviceImage,
      serviceTitle,
      companyName,
      website,
      description,
      category,
      price,
      userEmail,
    } = req.body;

    const changedFields = {
      ...(serviceImage && { serviceImage }),
      ...(serviceTitle && { serviceTitle }),
      ...(companyName && { companyName }),
      ...(website && { website }),
      ...(description && { description }),
      ...(category && { category }),
      ...(price && { price }),
      ...(userEmail && { userEmail }),
    };

    const updatedService = await servicesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: changedFields },
      { returnDocument: "after" }
    );

    if (!updatedService) throw createHttpErrors(404, "Service not found");
    console.log(updatedService);

    res.status(200).json(updatedService);
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

module.exports = {
  getHomeServices,
  addNewServices,
  getAllServices,
  getServiceById,
  updateService,
};
