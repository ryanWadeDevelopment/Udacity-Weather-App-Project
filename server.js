// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(3000, () => {
    console.log(`Server is running on 3000`);
});

// GET request for the home page
app.get("/", (req, res) => {
    res.sendFile("index.html");
});

// GET request to retrive data from the server
app.get("/data", (req, res) => {
    res.send(projectData);
});

//POST request to store weather data from the client
app.post("/data", (req, res) => {
    projectData.temp = req.body.temp;
    projectData.date = req.body.newDate;
    projectData.feelings = req.body.feelings;
    console.log(projectData);
});
