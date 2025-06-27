const Sequelize = require("sequelize")

const database = require("../database/database")

//* DEFINE THE ITEM MODEL TO BE USED IN THE DB

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