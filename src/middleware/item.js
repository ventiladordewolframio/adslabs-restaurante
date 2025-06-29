function validarNome(req, res, next) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({ message: "Name is required." });
    }

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).send({ message: "Name must be a non-empty string." });
    }

    if (!/^[\p{L}\s]+$/u.test(name)) {
        return res.status(400).send({ message: "Name must contain only letters and spaces." });
    }

    if (name.length < 3 || name.length > 50) {
        return res.status(400).send({ message: "Name must be between 3 and 50 characters long." });
    }

    next();
}

function validarPreco(req, res, next) {
    const { price } = req.body;

    if (price === undefined || price === null) {
        return res.status(400).send({ message: "Price is required." });
    }

    if (!Number.isInteger(price) || price < 0) {
        return res.status(400).send({ message: "Price must be a positive integer (multiplied by 100)." });
    }

    next();
}

module.exports = {
    validarNome,
    validarPreco
};