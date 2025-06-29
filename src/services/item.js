const Item = require("../models/item")

//* DIRECT DB CONNECTION AND STUFF

async function get(id) {
    const item = await Item.findByPk(id);
    return item;
}

async function listAll(query = {}) {
    // TODO needs a pagination version
    const items = await Item.findAll();
    return items;
}

async function create(dados) {
    const novoItem = await Item.create({
        name: dados.name,
        price: dados.price
    })
    return novoItem
}

async function update(id, dados) {
    const item = await Item.findByPk(id);

    if (!item) {
        return null;
    }

    // Only update fields if they are provided
    if (dados.name !== undefined) item.name = dados.name;
    if (dados.price !== undefined) item.price = dados.price;

    await item.save();
    return item;
}

async function remove(id) {
    const item = await Item.findByPk(id);
    if (!item) {
        return null;
    }
    await item.destroy();
    return item;
}

module.exports = {
    get,
    listAll,
    create,
    update,
    remove
}