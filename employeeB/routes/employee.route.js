const express = require("express");
const router = express.Router();
const controller = require("../controllers/employee.controller");

router.route("/").post(controller.store);
router.route("/").get(controller.index);
router.route("/:id").get(controller.get);
router.route("/:id").delete(controller.destroy);
router.route("/:id").put(controller.update);

module.exports = router;
