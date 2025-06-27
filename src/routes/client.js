const express = require('express');
const controller = require('../controllers/client');

const ClientRouter = express.Router();

//ClientRouter.get('/', (req, res) => {
//    res.send('Client route is working!');
//});

ClientRouter.get("/", controller.listClients)
ClientRouter.post("/", controller.create)
//ClientRouter.put("/:id", controller.update)
//ClientRouter.delete("/:id", controller.remove)


module.exports = ClientRouter;

// get    read only
// post   create
// put    update
// delete delete