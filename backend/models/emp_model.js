const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "email": String,
    "position": String,
    "salary": Number,
    "date_of_joining": Date,
    "department": String,
    "created_at": Date,
    "updated_at": Date
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;