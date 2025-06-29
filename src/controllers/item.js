const service = require("../services/item")

async function get(req, res) {
    const { id } = req.params;

    try {
        const item = await service.get(id);
        if (!item) {
            return res.status(404).send({ message: "Item não encontrado" });
        }
        return res.status(200).send({ item });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function listAll(req, res) {
    try {
        const items = await service.listAll(req.query);
        return res.status(200).send({ dados: items });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function listAllTop(req, res) {
    try {
        const items = await service.listAllTop(req.query);
        return res.status(200).send({ dados: items });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function create(req, res) {
    const { name, price } = req.body

    try {
        const newItem = await service.create({ name, price })
        return res.status(201).send({ message: "Novo item criado com sucesso", item: newItem })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

async function update(req, res) {
    const { name, price } = req.body;
    const { id } = req.params;

    try {
        const updatedItem = await service.update(id, { name, price });
        if (!updatedItem) {
            return res.status(404).send({ message: "Item não encontrado" });
        }
        return res.status(200).send({ message: "Item atualizado com sucesso", client: updatedItem });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function remove(req, res) {
    const { id } = req.params;

    try {
        const removedItem = await service.remove(id);
        if (!removedItem) {
            return res.status(404).send({ message: "Item não encontrado" });
        }
        return res.status(200).send({ message: "Item removido com sucesso", item: removedItem });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    get,
    listAll,
    listAllTop,
    create,
    update,
    remove
}