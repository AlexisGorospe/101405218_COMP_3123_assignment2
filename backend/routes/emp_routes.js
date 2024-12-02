const express = require("express")
const EmployeeModel = require("../models/emp_model.js");
//const { error, log } = require("console");

const routes = express.Router();

const cors = require("cors");

//---JUST ADDED, PLEASE TEST OR ADD SOME MORE STUFF---
routes.use(cors());

//User can get all employee list
routes.get("/employees", async (req, res) => {
    try{
        const employee_list = await EmployeeModel.find();
        console.log(employee_list.length)
        res.json(employee_list);
    }
    catch (err){
        res.status(200)
        console.log({"message": "oh dear, it appears we have a problem with getting the list of employees."});
    }
});

//User can create new employee
routes.post("/employees", async (req, res) => {
    const employee = new EmployeeModel(req.body);
    try{
        await employee.save();
        console.log(employee);
        res.status(201).send({message: "Employee created successfully.", user_id: employee["_id"]});
    }
    catch (err){
        res.status(500).send({"status": false, "message": "User not created."});
    }
});

//User can get employee details by employee id
routes.get("/employees/:eid", async (req, res) => {
    try{
        const emp_id = req.params.eid;
        const employee = await EmployeeModel.findById(emp_id);
        if (!employee){
            res.status(404).send("no employee found");
        }
        else{
            res.status(200).send(employee);
        }
    }
    catch{
        console.error("error updating book");
        res.status(500).json({message: "internal server error"})
    }
});

//User can update employee details
routes.put("/employees/:eid", async (req, res) => {
    try{
        await EmployeeModel.findByIdAndUpdate(req.params.eid, req.body);
        res.status(200).json({"message": "Employee details updated successfully."});

        /*
        if (!employee){
            res.status(404).send("no employee found");
        }
        else{
            console.log("employee updated");
            res.status(200).res.json({"message": "Employee details updated successfully."});
        }
            */
    }
    catch (err){
        console.error("error updating employee: " + err);
        
        res.status(500).json({message: "internal server error"})
        //res.status(500).json({message: "internal server error"})
    }
});

//User can delete employee by employee id
routes.delete("/employees", async (req, res) => {
    try{
        //console.log(req.params.eid)
        //const employee = new EmployeeModel(req.body);

        console.log(req.query)
        
        const employee_deleted = await EmployeeModel.findByIdAndDelete(req.query["eid"]);
        
        
        if(!employee_deleted){
            res.status(400).send("that employee does not exist");
        }
        else{
            res.status(200).json({"message": "Employee deleted successfully."});
            console.log("that employee just got fired");
        }
    }catch (err){
        res.status(500).send(err);
    }
});

module.exports = routes; //took a while to realize i needed this at the very end of the file