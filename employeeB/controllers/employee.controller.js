/**
 * Employee Controller
 *
 * This controller handles CRUD operations for managing employees.
 * It allows to add new employees, retrieve employess information, update email addresses,
 * list all employees, and delete employees.
 *
 * @module controllers/employees.controller
 */

const Employee = require("../models/employee.model");

/**
 * Handles employee creation.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 *
 * Author: Arslan Akmal
 * Date: 13 Nov,2023
 */

exports.store = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).send({
        status: 400,
        message: "Email already exists",
      });
    }

    const employee = await Employee.create(req.body);
    res.send({
      status: 200,
      employee,
      message: "Employee created successfully",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Retrive all employees.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 *
 * Author: Arslan Akmal
 * Date: 13 Nov,2023
 */

exports.index = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.json({
      status: 200,
      message: "Employees found successfully",
      employees,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Retrive a single employee by ID.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 *
 * Author: Arslan Akmal
 * Date: 13 Nov,2023
 */

exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .send({ message: "Employee not found", success: false });
    }
    res.json({
      employee,
      message: "Employee found successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a single employee by ID.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 *
 * Author: Arslan Akmal
 * Date: 13 Nov,2023
 */

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .send({ message: "Employee not found", success: false });
    }
    res.json({
      message: "Employee deleted successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update a single employee by ID.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 *
 * Author: Arslan Akmal
 * Date: 13 Nov,2023
 */

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!employee) {
      return res
        .status(404)
        .send({ message: "Employee not found", success: false });
    }
    res.json({
      employee,
      message: "Employee Updated successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
