/* Global Variables */
let data = {}; // Data from OpenWeatherMap
let reqData = {}; // Data from the app server

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

const generateButton = document.getElementById("generate");

// Event listener for generate button click
generateButton.addEventListener("click", () => {
    const zipcode = document.querySelector("#zip").value;
    const apiKey = "103b94a696dcbb217b6e394c3401c2a4&units=imperial";
    const apiURL = `api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}`;
    runAsync(apiURL);
});

// Get weather from OpenWeatherMap
const getWeatherData = async (apiURL) => {
    const request = await fetch("http://" + apiURL);

    try {
        const resData = await request.json();
        const feelings = document.getElementById("feelings").value;
        const temp = resData.main.temp;
        console.log(newDate, temp, feelings);
        data = {
            newDate: newDate,
            temp: temp,
            feelings: feelings,
        };
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// Post data to app server
const postData = async (url = "", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

// Get data from the app server and update UI
const getData = async (url = "") => {
    const request = await fetch(url);
    try {
        reqData = await request.json();
        document.getElementById("date").innerHTML = reqData.date;
        document.getElementById("temp").innerHTML =
            "Temp: " + Math.floor(reqData.temp);
        document.getElementById("content").innerHTML = reqData.feelings;
        return reqData;
    } catch (error) {
        console.log("error", error);
    }
};

// Wrapper function for async processes
function runAsync(apiURL) {
    getWeatherData(apiURL)
        .then(function (data) {
            postData("/data", data);
        })
        .then(function () {
            getData("/data");
        });
}
