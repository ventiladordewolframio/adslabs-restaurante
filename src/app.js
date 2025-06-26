require("dotenv").config({ path: ".env"})
// Load the Express library
const express = require('express');

const ClientRouter = require('./routes/client');

// Create an Express application
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
// Use the client router for routes starting with /client
app.use('/api/client', ClientRouter);

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Root is working!');
});

app.get('/api', (req, res) => {
  res.send('Root of the api is working!');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`The server is running at \"http://localhost:${process.env.PORT}\" !!!`);
});
