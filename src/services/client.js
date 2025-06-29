const Client = require("../models/client")

//* DIRECT DB CONNECTION AND STUFF

async function get(id) {
    const client = await Client.findByPk(id);
    return client;
}

async function listAll(query = {}) {
    // TODO needs a pagination version
    const clients = await Client.findAll();
    return clients;
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
    get,
    listAll,
    create,
    update,
    remove
}