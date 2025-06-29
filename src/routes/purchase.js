const express = require('express');
const controller = require('../controllers/purchase');
const middlewarePurchase = require("../middleware/purchase")
const middlewareUtil = require("../middleware/util")

const Router = express.Router();

// GET BY ID
Router.get("/:id",
    middlewareUtil.validarId,
    controller.get
)
//LIST ALL
Router.get("/", controller.listAll)
//CREATE
Router.post("/",
    middlewarePurchase.validarPurchaseCampos,
    controller.create
)
//EDIT
Router.put("/:id",
    middlewareUtil.validarId,
    middlewarePurchase.validarPurchaseCampos,
    controller.update
)
//DELETE
Router.delete("/:id",
    middlewareUtil.validarId,
    controller.remove
)

module.exports = Router;