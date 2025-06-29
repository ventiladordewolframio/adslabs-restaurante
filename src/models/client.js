const Sequelize = require("sequelize")
const database = require("../database/database")

//* DEFINE THE CLIENT MODEL TO BE USED IN THE DB

const Client = database.define("Clients", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    cpf: {
        type: Sequelize.STRING,
        unique: true
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true // Cliente começa como ativo por padrão
    }
})

module.exports = Client