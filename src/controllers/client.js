const service = require("../services/client")

async function get(req, res) {
    const { id } = req.params;

    if (!id) {//!TO DELETE BECAUSE MIDDLEWARE
        return res.status(400).send({ message: "ID is required." });
    }

    if (id < 1) {//!TO DELETE BECAUSE MIDDLEWARE
        return res.status(400).send({ message: "ID must be a positive integer." });
    }

    try {
        const client = await service.get(id);
        if (!client) {
            return res.status(404).send({ message: "Item não encontrado" });
        }
        return res.status(200).send({ client });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function listAll(req, res) {
    try {
        const filter = {};
        if (req.query.active === "true") {
            filter.ativo = true;
        } else if (req.query.active === "false") {
            filter.ativo = false;
        }
        const clients = await service.listAll(filter);
        return res.status(200).send({ dados: clients });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function listTop5ByOrders(req, res) {
    try {
        const filter = {};
        if (req.query.active === "true") {
            filter.ativo = true;
        } else if (req.query.active === "false") {
            filter.ativo = false;
        }
        const clients = await service.listTop5ByOrders(filter);
        return res.status(200).send({ dados: clients });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function listTop5ByTotalSpent(req, res) {
    try {
        const filter = {};
        if (req.query.active === "true") {
            filter.ativo = true;
        } else if (req.query.active === "false") {
            filter.ativo = false;
        }
        const clients = await service.listTop5ByTotalSpent(filter);
        return res.status(200).send({ dados: clients });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function create(req, res) {
    const { name, cpf } = req.body

    try {
        const newClient = await service.create({ name, cpf })
        return res.status(201).send({ message: "Novo cliente criado com sucesso", client: newClient })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

async function update(req, res) {
    const { name, cpf, ativo } = req.body;
    const { id } = req.params;

    try {
        const updatedClient = await service.update(id, { name, cpf, ativo });
        if (!updatedClient) {
            return res.status(404).send({ message: "Cliente não encontrado" });
        }
        return res.status(200).send({ message: "Cliente atualizado com sucesso", client: updatedClient });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function remove(req, res) {
    const { id } = req.params;

    try {
        const removedClient = await service.remove(id);
        if (!removedClient) {
            return res.status(404).send({ message: "Cliente não encontrado" });
        }
        return res.status(200).send({ message: "Cliente removido com sucesso (soft delete)", client: removedClient });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
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