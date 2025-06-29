const express = require('express');
const controller = require('../controllers/item');

const Router = express.Router();

Router.get("/:id", controller.get)
Router.get("/", controller.listAll)
Router.post("/", controller.create)
Router.put("/:id", controller.update)
Router.delete("/:id", controller.remove)

module.exports = Router;