const express = require('express');
const controller = require('../controllers/client');

const Router = express.Router();

////Router.get('/', (req, res) => {
////    res.send('Client route is working!');
////});

Router.get("/top5orders", controller.listTop5ByOrders);
Router.get("/top5spent", controller.listTop5ByTotalSpent);
Router.get("/:id", controller.get)
Router.get("/", controller.listAll)
Router.post("/", controller.create)
Router.put("/:id", controller.update)
Router.delete("/:id", controller.remove)

module.exports = Router;