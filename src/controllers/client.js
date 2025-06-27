const service = require("../services/client")
const cpfUtils = require('cpf-utils')
//* PARSING THE INPUTS AND SENDING OUTPUTS, VALIDATION ESSENTIALY

async function listAll(req, res) {
    try {
        const clients = await service.listAll(req.query);
        return res.status(200).send({ dados: clients });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function create(req, res) {
    const { name, cpf } = req.body
    if (!name || !cpf) {
        return res.status(400).send({ message: "Name and CPF are required." })
    }

    if (!cpfUtils.isValid(cpf)) {
        return res.status(400).send({ message: "CPF is invalid." })
    }

    try {
        const novoClient = await service.create({ name, cpf })
        return res.status(201).send({ message: "Novo cliente criado com sucesso", client: novoClient })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

async function update(req, res) {
    const { name, cpf } = req.body;
    const { id } = req.params;

    if (!name && !cpf) {
        return res.status(400).send({ message: "At least one of Name or CPF is required to update." });
    }

    if (cpf && !cpfUtils.isValid(cpf)) {
        return res.status(400).send({ message: "CPF is invalid." });
    }

    try {
        const updatedClient = await service.update(id, { name, cpf });
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
        return res.status(200).send({ message: "Cliente removido com sucesso", client: removedClient });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    listAll,
    create,
    update,
    remove
}