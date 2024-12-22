const router = require("express").Router();
const servicesController = require("../controllers/services.controller");

router.get("/home-services", servicesController.getHomeServices);

module.exports = router;
