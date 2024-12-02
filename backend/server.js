const express = require("express");
const mongoose = require("mongoose");

const emp_routes = require("./routes/emp_routes.js");
const user_routes = require("./routes/user_routes.js");

const password = "yHQkfo3bPAClfJab";
const DB_CONNECTION_STRING = "mongodb+srv://alexisgorospe:yHQkfo3bPAClfJab@cluster0.jzh11.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const cors = require("cors");

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("error: " + err)
})

const app = express();

const SERVER_PORT = 3002;

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1/emp", emp_routes);
app.use("/api/v1/user", user_routes);

//---JUST ADDED, PLEASE TEST OR ADD SOME MORE STUFF---
app.use(cors());

app.route("/").get((req, res) => {
    res.send("<h1>MongoDB + Mongoose Example</h1>")
})

app.listen(SERVER_PORT, () =>{
console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})