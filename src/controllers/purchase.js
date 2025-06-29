const servicePurchase = require("../services/purchase")
const serviceItem = require("../services/item")

async function get(req, res) {
    const { id } = req.params;

    try {
        const purchase = await servicePurchase.get(id);
        if (!purchase) {
            return res.status(404).send({ message: "Item não encontrado" });
        }
        return res.status(200).send({ purchase });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function listAll(req, res) {
    try {
        const Purchases = await servicePurchase.listAll(req.query);
        return res.status(200).send({ dados: Purchases });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function create(req, res) {
    const { clientId, itemId, quantity } = req.body

    try {
        const item = await serviceItem.get(itemId);
        if (!item) {
            return res.status(404).send({ message: "Item não encontrado" });
        }

        const newPurchase = await servicePurchase.create({
            clientId,
            itemId,
            quantity,
            price_individual: item.price
        });
        return res.status(201).send({ message: "Nova purchase criada com sucesso", purchase: newPurchase });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function update(req, res) {
    const { clientId, itemId, quantity, price_individual } = req.body
    const { id } = req.params;

    try {
        const updatedPurchase = await servicePurchase.update(id, {
            clientId,
            itemId,
            quantity,
            price_individual
        });
        if (!updatedPurchase) {
            return res.status(404).send({ message: "Purchase não encontrada" });
        }
        return res.status(200).send({ message: "Purchase atualizada com sucesso", purchase: updatedPurchase });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

async function remove(req, res) {
    const { id } = req.params;

    try {
        const removedPurchase = await servicePurchase.remove(id);
        if (!removedPurchase) {
            return res.status(404).send({ message: "Item não encontrado" });
        }
        return res.status(200).send({ message: "Item removido com sucesso", item: removedPurchase });
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