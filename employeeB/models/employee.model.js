/**
 * Employees Schema - This employee schema is to handle employees
 *
 * The Employees schema defines the structure for managing all employees.
 *
 * @private
 */

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
