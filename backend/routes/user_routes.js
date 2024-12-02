const express = require("express");
const UserModel = require("../models/user_model.js");
//const { error, log } = require("console");

const routes = express.Router();

const cors = require("cors");
const EmployeeModel = require("../models/emp_model");

//---JUST ADDED, PLEASE TEST OR ADD SOME MORE STUFF---
routes.use(cors());

//Allow user to create new account
routes.post("/signup", async (req, res) => {
    const user = new UserModel(req.body);
    try{
        await user.save();
        console.log(user);
        res.send({message: "User created successfully.", user_id: user["_id"]});
    }
    catch (err){
        res.status(500).send({"status": false, "message": "User not created."});
    }
});

//Allow user to access the system
routes.post("/login", async(req, res) => {
    const user = new UserModel(req.body);
    try{
        console.log(user["email"]);
        console.log(user["password"]);

        const user_list = await UserModel.find();

        console.log(user_list)

        let login_status = false;
        for (var i = 0; i < user_list.length; i++){
            if (user["email"] == user_list[i]["email"] && user["password"] == user_list[i]["password"]){
                login_status = true;
                break;
            }
        }
        
        if (login_status){
            res.send({message: "Signup successful."});
        }
        else{
            res.status(500).send({"status": false, "message": "Invalid Username and password"});
        }
    }
    catch{
        res.status(500).send({"status": false, "message": "the error, it just happened."});
    }
});

module.exports = routes;