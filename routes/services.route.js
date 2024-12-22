const router = require("express").Router();
const servicesController = require("../controllers/services.controller");

router.get("/home-services", servicesController.getHomeServices);
router.post("/new-services", servicesController.addNewServices);

module.exports = router;
