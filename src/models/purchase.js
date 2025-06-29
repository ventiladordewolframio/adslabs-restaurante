const Sequelize = require("sequelize")
const database = require("../database/database")

//* DEFINE THE PURCHASE MODEL TO BE USED IN THE DB

const Purchase = database.define("purchases", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clientId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    itemId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: Sequelize.INTEGER,
    price_individual: Sequelize.INTEGER,
})

module.exports = Purchase