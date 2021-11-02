const express = require("express");
const routes = express.Router();
const controller = require("../controller/controller");

routes.get("/showDetail", controller.getEmployeeDetails);
routes.post("/addNew", controller.addNewEmployee);
routes.post("/delete", controller.deleteEmployee);
routes.post("/update", controller.editEmployee);

module.exports = routes;
