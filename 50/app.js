// function that adds variables to app variable
const express = require('express');

const app = express();

// Defines routes
// .get is the http method for requests (retrieves a resource)
app.get('/', (request, response) => {
    // response.status(200).send('Server message to client')
    response
    .status(200  )
    .json({message: 'Server message to client', otherField: 'Some text'})
});

// post creates a resource
app.post('/', (request, response) => {
    response.send('Post endpoint')
})

const port = 3000;
// Starts up server
app.listen(port, () => {
    console.log("Server listening")
});