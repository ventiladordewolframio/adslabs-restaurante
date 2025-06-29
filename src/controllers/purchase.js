const servicePurchase = require("../services/purchase")
const serviceItem = require("../services/item")
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

    if (!clientId || !itemId || !quantity) {
        return res.status(400).send({ message: "clientId, itemId and quantity are required." })
    }

    if (!Number.isInteger(clientId) || clientId < 1) {
        return res.status(400).send({ message: "clientId must be a integer higher than 0." });
    }

    if (!Number.isInteger(itemId) || itemId < 1) {
        return res.status(400).send({ message: "itemId must be a integer higher than 0." });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).send({ message: "quantity must be a integer higher than 0." });
    }

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

    if (!clientId && !itemId && !quantity && !price_individual) {
        return res.status(400).send({ message: "At least one of clientId, itemId, quantity and price_individual is required to update." });
    }

    if (clientId) {// only validate if clientId is provided
        if (!Number.isInteger(clientId) || clientId < 1) {
            return res.status(400).send({ message: "clientId must be a integer higher than 0." });
        }
    }

    if (itemId) {// only validate if itemId is provided
        if (!Number.isInteger(itemId) || itemId < 1) {
            return res.status(400).send({ message: "itemId must be a integer higher than 0." });
        }
    }

    if (quantity) {// only validate if quantity is provided
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).send({ message: "quantity must be a integer higher than 0." });
        }
    }

    if (price_individual) {// only validate if price_individual is provided
        if (!Number.isInteger(price_individual) || price_individual < 0) {//intencionalmente pode ser zero, pois nao e explicitamente invalido mesmo q nao faca mt sentido
            return res.status(400).send({ message: "price_individual must be a positive integer (multiplied by 100)." });
        }
    }

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