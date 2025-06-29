function validarId(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "ID is required."
        });
    }

    if (id < 1) {
        return res.status(400).json({
            message: "ID must be a positive integer."
        });
    }

    next();
}

module.exports = {
    validarId
}