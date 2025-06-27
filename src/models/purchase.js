const Sequelize = require("sequelize")

const database = require("../database/database")
const Client = require("./client")
const Item = require("./item")

//* DEFINE THE PURCHASE MODEL TO BE USED IN THE DB

const Purchase = database.define("purchases", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        clientId: {
        type: Sequelize.INTEGER,
        references: {
            model: Clients,
            key: 'id'
        }
    },
        idItem: {
        type: Sequelize.INTEGER,
        references: {
            model: Items,
            key: 'id'
        }
    },
    quantity: Sequelize.INTEGER,
    price_individual: Sequelize.INTEGER,
})

Purchase.belongsTo(Client, { foreignKey: 'clientId' })
Purchase.belongsTo(Item, { foreignKey: 'idItem' })

module.exports = Purchase