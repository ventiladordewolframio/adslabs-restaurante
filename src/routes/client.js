const express = require('express');

const controller = require('../controllers/client');
const middlewareClient = require("../middleware/client")
const middlewareUtil = require("../middleware/util")

const Router = express.Router();

// GET TOP 5 BY ORDERS
Router.get("/top5orders", controller.listTop5ByOrders);
// GET TOP 5 BY TOTAL SPENT
Router.get("/top5spent", controller.listTop5ByTotalSpent);
//GET BY ID
Router.get("/:id",
    middlewareUtil.validarId,
    controller.get
)
//LIST ALL
Router.get("/", controller.listAll)
//CREATE
Router.post("/",
    middlewareClient.validarCPF,
    middlewareClient.validarNome,
    controller.create
)
// EDIT
Router.put("/:id",
    middlewareUtil.validarId,
    middlewareClient.validarCPF,
    middlewareClient.validarNome,
    middlewareClient.validarAtivo,
    controller.update
)
//DELETE
Router.delete("/:id",
    middlewareUtil.validarId,
    controller.remove
)

module.exports = Router;