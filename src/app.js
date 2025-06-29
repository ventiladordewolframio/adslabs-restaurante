require("dotenv").config({ path: ".env"})
const express = require('express');

const ClientRouter = require('./routes/client');
const ItemRouter = require('./routes/item');
const PurchaseRouter = require('./routes/purchase');

const cpfUtils = require('cpf-utils')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/client', ClientRouter);
app.use('/api/item', ItemRouter);
app.use('/api/purchase', PurchaseRouter);

// Starts the server
app.listen(process.env.PORT, () => {
  console.log(`The server is running at \"http://localhost:${process.env.PORT}\" !!!`);
});
