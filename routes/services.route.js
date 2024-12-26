const router = require("express").Router();
const servicesController = require("../controllers/services.controller");
const jwtVerify = require("../middlewares/jwt.middleware");

router.get("/home-services", servicesController.getHomeServices);
router.post("/new-service", jwtVerify, servicesController.addNewServices);
router.get("/all-services", servicesController.getAllServices);
router.get("/my-services", jwtVerify, servicesController.getMyServices);
router
  .route("/service/:id")
  .get(servicesController.getServiceById)
  .patch(jwtVerify, servicesController.updateService)
  .delete(jwtVerify, servicesController.deleteService);

module.exports = router;
