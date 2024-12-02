const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "username": String,
    "email": String,
    "password": String, // This should be hashed
    "created_at": Date,
    "updated_at": Date
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;