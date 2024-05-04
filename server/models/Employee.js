const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  phone: String,
  name: String,
  email: String,
  password: String,
  gender: String,
  birthday: String,
});

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
module.exports = EmployeeModel;
