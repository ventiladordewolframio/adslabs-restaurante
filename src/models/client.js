const Sequelize = require("sequelize")
const database = require("../database/database")

//* DEFINE THE CLIENT MODEL TO BE USED IN THE DB

const Client = database.define("Clients", {
    //TODO this is just the basic properties it must have, i should check for null and other later
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    cpf: {
        type: Sequelize.STRING,
        unique: true
    }
})

module.exports = Client