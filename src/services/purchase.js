const Purchase = require("../models/purchase")

//* DIRECT DB CONNECTION AND STUFF

async function create(dados) {
    // dados: { clientId: 1, idItem: 2, quantity: 3, price_individual: 2500 }
    const novaCompra = await Purchase.create({
        clientId: dados.clientId,      // FK to clients table
        idItem: dados.idItem,          // FK to items table
        quantity: dados.quantity,
        price_individual: dados.price_individual
    })
    return novaCompra
}

module.exports = {
    create,
}