const router = require("express").Router();
const servicesController = require("../controllers/services.controller");
const jwtVerify = require("../middlewares/jwt.middleware");

router.get("/home-services", servicesController.getHomeServices);
router.post("/new-service", jwtVerify, servicesController.addNewServices);
router.get("/all-services", jwtVerify, servicesController.getAllServices);
router.get("/service/:id", servicesController.getServiceById);

module.exports = router;
