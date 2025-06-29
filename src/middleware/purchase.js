function validarPurchaseCampos(req, res, next) {
    const { clientId, itemId, quantity } = req.body;

    if (clientId === undefined || itemId === undefined || quantity === undefined) {
        return res.status(400).send({ message: "clientId, itemId and quantity are required." });
    }

    if (!Number.isInteger(clientId) || clientId < 1) {
        return res.status(400).send({ message: "clientId must be an integer higher than 0." });
    }

    if (!Number.isInteger(itemId) || itemId < 1) {
        return res.status(400).send({ message: "itemId must be an integer higher than 0." });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).send({ message: "quantity must be an integer higher than 0." });
    }

    next();
}

module.exports = {
    validarPurchaseCampos
};