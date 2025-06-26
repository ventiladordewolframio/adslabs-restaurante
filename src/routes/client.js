const express = require('express');

const ClientRouter = express.Router();

ClientRouter.get('/', (req, res) => {
    res.send('Client route is working!');
});

module.exports = ClientRouter;

