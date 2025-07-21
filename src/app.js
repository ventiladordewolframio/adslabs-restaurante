require("dotenv").config({ path: ".env"})
const express = require('express');

const ClientRouter = require('./routes/client');
const ItemRouter = require('./routes/item');
const PurchaseRouter = require('./routes/purchase');

const app = express();
app.use(express.json());
app.use('/api/client', ClientRouter);
app.use('/api/item', ItemRouter);
app.use('/api/purchase', PurchaseRouter);

app.listen(process.env.PORT, () => {
  console.log(`The server is running at \"${process.env.PORT}\"`);
});