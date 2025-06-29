const service = require("../services/item")
//* PARSING THE INPUTS AND SENDING OUTPUTS, VALIDATION ESSENTIALY

async function get(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "ID is required." });
    }

    if ( id < 1) {
        return res.status(400).send({ message: "ID must be a positive integer." });
    }

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

async function create(req, res) {
    const { name, price } = req.body

    if (!name || !price) {
        return res.status(400).send({ message: "Name and Price are required." })
    }

    if (!/^[\p{L}\s]+$/u.test(name)) {
        return res.status(400).send({ message: "Name must contain only letters and spaces." });
    }

    if (name.length < 3 && name.length > 50) {
        return res.status(400).send({ message: "Name must be at least 3 characters long." });
    }

    if (!Number.isInteger(price) || price <= 0) {
        return res.status(400).send({ message: "Price must be a positive integer (multiplied by 100)." });
    }

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

    if (!name && !price) {
        return res.status(400).send({ message: "At least one of Name or Price is required to update." });
    }

    if (name) {// only validate if name is provided
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return res.status(400).send({ message: "Name must contain only letters and spaces." });
        }

        if (name.length < 3 && name.length > 50) {
            return res.status(400).send({ message: "Name must be at least 3 characters long." });
        }
    }

    if (price) {// only validate if price is provided
        if (!Number.isInteger(price) || price <= 0) {
            return res.status(400).send({ message: "Price must be a positive integer (multiplied by 100)." });
        }
    }

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
    create,
    update,
    remove
}