const Sequelize = require("sequelize")

const database = require("../database/database")

const Item = database.define("items", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
})

module.exports = Item