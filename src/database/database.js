const Sequelize = require("sequelize")

//* CREATES THE DB CONNECTION AND PASSES THAT TO OTHERS TO USE

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST
    }
)

module.exports = database

require("../models/client")
require("../models/item")
require("../models/purchase")

database.sync()