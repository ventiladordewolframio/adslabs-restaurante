const Item = require("../models/item")

//* DIRECT DB CONNECTION AND STUFF

async function create(dados) {
    // dados: { name: "Pizza", price: 2500 }
    const novoItem = await Item.create({
        name: dados.name,
        price: dados.price
    })
    return novoItem
}

module.exports = {
    create,
}