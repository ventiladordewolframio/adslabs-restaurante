const Client = require("../models/client")

//* DIRECT DB CONNECTION AND STUFF

async function listAll(query = {}) {
    // TODO needs a pagination version, and this one should be deprecated
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

    await client.save();
    return client;
}

async function remove(id) {
    const client = await Client.findByPk(id);
    if (!client) {
        return null;
    }
    await client.destroy();
    return client;
}

module.exports = {
    listAll,
    create,
    update,
    remove
}