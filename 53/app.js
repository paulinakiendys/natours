const fs = require('fs');
// function that adds variables to app variable
const express = require('express');
const { request } = require('http');

const app = express();

// Middleware: function that stands between the request and response (middle) and can modify the incoming request data
app.use(express.json());

// Reads the data and converts json to array of objects
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Route handler for GET requests
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

// Route handler for POST requests so we can add a new tour to the dataset
app.post('/api/v1/tours', (request, response) => {
    // Sends data from the client to the server
    // console.log(request.body);
    
    // Takes id of last object and adds 1
    const newId = tours[tours.length - 1].id + 1
    // console.log(newId); returns 9
    
    // Object with body + new id
    // Object.assign creates a new object by merging two objects together
    const newTour = Object.assign({id: newId}, request.body);
    // console.log(newTour); returns { id: 9, name: 'Test Tour', duration: 10, difficulty: 'easy' }
    
    // Pushes newTour to the tours array
    tours.push(newTour);

    // Persists the array to the tours-simple.json file
    // Overwrites the json file: file we want to write to, stringified data object we want to write, callback function, 
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (error) => {
        // What we want to do as soon as the file is written
        // status code "created" and sends the newly created object as a response
        response.status(201).json({
            status: "success",
            data: {
                tour: newTour
            } 
         })
    })
    // response.send('Placeholder text to finish the request-response cycle');
});

const port = 3000;
// Starts up server
app.listen(port, () => {
    console.log("Server listening")
});