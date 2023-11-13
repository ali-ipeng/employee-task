var express = require("express");
var router = express.Router();

const employeeRoute = require("./employee.route");

router.use("/employee", employeeRoute);

module.exports = router;
