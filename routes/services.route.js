const router = require("express").Router();
const servicesController = require("../controllers/services.controller");
const jwtVerify = require("../middlewares/jwt.middleware");

router.get("/home-services", servicesController.getHomeServices);
router.post("/new-service", jwtVerify, servicesController.addNewServices);
router.get("/all-services", jwtVerify, servicesController.getAllServices);
router
  .route("/service/:id")
  .get(servicesController.getServiceById)
  .patch(jwtVerify, servicesController.updateService)
  .delete(jwtVerify, servicesController.deleteService);

module.exports = router;
