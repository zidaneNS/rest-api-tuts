const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.createEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.get("/:id", employeeController.getEmployeeByID);

module.exports = router;
