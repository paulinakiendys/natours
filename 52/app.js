const fs = require('fs');
// function that adds variables to app variable
const express = require('express');

const app = express();

// Reads the data and converts json to array of objects
// __dirname is the folder where the current script is located
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Starts implementation of 'tours' route
// Always specify API version
// Formats data using JSend data specification
app.get('/api/v1/tours', (request, response) => {
    response.status(200).json({
        status: "success",
        // field with number of results we are sending
        results: tours.length,
        data: {
            tours: tours
        }
    });
})

const port = 3000;
// Starts up server
app.listen(port, () => {
    console.log("Server listening")
});