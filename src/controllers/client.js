const service = require("../services/client")
//* PARSING THE INPUTS AND SENDING OUTPUTS, VALIDATION ESSENTIALY

async function get(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "ID is required." });
    }

    if (id < 1) {
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

function validarCPF(cpfInput) {

    var Total = 0
    var Resto

    var cpf = String(cpfInput).replace(/[^\d]/g, '') // Remove tudo oq nao e numero

    if (cpf.length !== 11) { return false }
    if (cpf.split('').every(d => d === cpf[0])) { return false } // Verifica se todos os dígitos são iguais

    for (i = 1; i <= 9; i++) { // soma e multiplicação pela posicao dos nove primeiros dígitos
        Total = Total + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    Resto = (Total * 10) % 11
    if ((Resto == 10) || (Resto == 11)) { // Se o resto for 10 ou 11, o resto é 0
        Resto = 0
    }

    if (Resto != parseInt(cpf.substring(9, 10))) { return false } // Verifica se o resto é igual ao décimo dígito

    Total = 0
    for (i = 1; i <= 10; i++) { // Soma e multiplicação pela posição dos dez primeiros dígitos
        Total = Total + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    Resto = (Total * 10) % 11
    if ((Resto == 10) || (Resto == 11)) { // Se o resto for 10 ou 11, o resto é 0
        Resto = 0
    }

    if (Resto != parseInt(cpf.substring(10, 11))) { return false } // Verifica se o resto é igual ao décimo primeiro dígito

    return true
}

async function create(req, res) {
    const { name, cpf } = req.body
    if (!name || !cpf) {
        return res.status(400).send({ message: "Name and CPF are required." })
    }

    if (!validarCPF(cpf)) {
        return res.status(400).send({ message: "CPF is invalid." })
    }

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

    if (!name && !cpf && typeof ativo === "undefined") {
        return res.status(400).send({ message: "At least one of Name, CPF, or ativo is required to update." });
    }

    if (cpf && !validarCPF(cpf)) {
        return res.status(400).send({ message: "CPF is invalid." });
    }

    if (typeof ativo !== "undefined" && typeof ativo !== "boolean") {
        return res.status(400).send({ message: "Ativo must be a boolean value." });
    }

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