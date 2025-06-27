require("dotenv").config({ path: ".env"})
const express = require('express');

const ClientRouter = require('./routes/client');
const cpfUtils = require('cpf-utils')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/client', ClientRouter);


// Standard routes for debugging
// These routes are not part of the API, but are used to check if the server is running correctly.
app.get('/', (req, res) => {
  res.send('Root is working!');
});
app.get('/api', (req, res) => {
  res.send('Root of the api is working!');
});

// Starts the server
app.listen(process.env.PORT, () => {
  console.log(`The server is running at \"http://localhost:${process.env.PORT}\" !!!`);
  console.log(cpfUtils.generate(),cpfUtils.generate(),cpfUtils.generate(),cpfUtils.generate(),cpfUtils.generate(),cpfUtils.generate())
});

