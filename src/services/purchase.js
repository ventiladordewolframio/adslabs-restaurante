const Purchase = require("../models/purchase")

//* DIRECT DB CONNECTION AND STUFF

async function get(id) {
    const purchase = await Purchase.findByPk(id);
    return purchase;
}

async function listAll(query = {}) {
    // TODO needs a pagination version
    const purchases = await Purchase.findAll();
    return purchases;
}

async function create(dados) {
    const novaPurchase = await Purchase.create({
        clientId: dados.clientId,
        itemId: dados.itemId,
        quantity: dados.quantity,
        price_individual: dados.price_individual
    });
    return novaPurchase;
}

async function update(id, dados) {
    const purchase = await Purchase.findByPk(id);

    if (!purchase) {
        return null;
    }

    // Only update fields if they are provided
    if (dados.clientId !== undefined) purchase.clientId = dados.clientId;
    if (dados.itemId !== undefined) purchase.itemId = dados.itemId;
    if (dados.quantity !== undefined) purchase.quantity = dados.quantity;
    if (dados.price_individual !== undefined) purchase.price_individual = dados.price_individual;

    await purchase.save();
    return purchase;
}

async function remove(id) {
    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
        return null;
    }
    await purchase.destroy();
    return purchase;
}

module.exports = {
    get,
    listAll,
    create,
    update,
    remove
}