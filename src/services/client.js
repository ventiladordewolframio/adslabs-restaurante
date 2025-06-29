const { Client, Purchase } = require("../models");
const { Sequelize } = require("sequelize");

//* DIRECT DB CONNECTION AND STUFF

async function get(id) {
    const client = await Client.findByPk(id);
    return client;
}

async function listAll(filter = {}) {
    const clients = await Client.findAll({ where: filter });
    return clients;
}

async function listTop5ByOrders() {
    const clients = await Purchase.findAll({
        attributes: [
            'clientId',
            [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity']
        ],
        group: [
            'clientId',
            'client.id',
            'client.name'
        ],
        order: [[Sequelize.fn('SUM', Sequelize.col('quantity')), 'DESC']],
        limit: 5,
        include: [{
            model: Client,
            as: 'client',
            attributes: ['id', 'name']
        }]
    });

    return clients.map(purchase => ({
        client: purchase.client,
        totalQuantity: Number(purchase.get('totalQuantity'))
    }));
}

async function listTop5ByTotalSpent() {
    const clients = await Purchase.findAll({
        attributes: [
            'clientId',
            [Sequelize.fn('SUM', Sequelize.literal('quantity * price_individual')), 'totalSpent']
        ],
        group: [
            'clientId',
            'client.id',
            'client.name'
        ],
        order: [[Sequelize.literal('SUM(quantity * price_individual)'), 'DESC']],
        limit: 5,
        include: [{
            model: Client,
            as: 'client',
            attributes: ['id', 'name']
        }]
    });

    return clients.map(purchase => ({
        client: purchase.client,
        totalSpent: Number(purchase.get('totalSpent'))
    }));
}

async function create(dados) {
    const novoClient = await Client.create({
        name: dados.name,
        cpf: dados.cpf
    })
    return novoClient
}

async function update(id, dados) {
    const client = await Client.findByPk(id);

    if (!client) {
        return null;
    }

    // Only update fields if they are provided
    if (dados.name !== undefined) client.name = dados.name;
    if (dados.cpf !== undefined) client.cpf = dados.cpf;
    if (dados.ativo !== undefined) client.ativo = dados.ativo;

    await client.save();
    return client;
}

async function remove(id) {
    const client = await Client.findByPk(id);
    if (!client) {
        return null;
    }
    client.ativo = false; // Marca como inativo (soft delete)
    await client.save();
    return client;
}

module.exports = {
    listTop5ByOrders,
    listTop5ByTotalSpent,
    get,
    listAll,
    create,
    update,
    remove
}