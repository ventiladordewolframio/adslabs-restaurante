const express = require('express');

const controller = require('../controllers/item');
const middlewareItem = require("../middleware/item")
const middlewareUtil = require("../middleware/util")

const Router = express.Router();

// LIST ALL TOP BY ORDERS
Router.get("/top", controller.listAllTop);
// GET BY ID
Router.get("/:id",
    middlewareUtil.validarId,
    controller.get
)
// LIST ALL
Router.get("/", controller.listAll)
//CREATE
Router.post("/",
    middlewareItem.validarNome,
    middlewareItem.validarPreco,
    controller.create
)
// EDIT
Router.put("/:id",
    middlewareUtil.validarId,
    middlewareItem.validarNome,
    middlewareItem.validarPreco,
    controller.update
)
//DELETE
Router.delete("/:id", 
    middlewareUtil.validarId,
    controller.remove
)

module.exports = Router;