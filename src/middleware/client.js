
function validarRawCPF(cpfInput) {

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

function validarCPF(req, res, next) {
    const { cpf } = req.body;

    if (!cpf) {
        return res.status(400).send({ message: "CPF is required." });
    }

    if (!validarRawCPF(cpf)) {
        return res.status(400).send({ message: "CPF is invalid." });
    }

    next();
}

function validarNome(req, res, next) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({ message: "Name is required." });
    }

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).send({ message: "Name must be a non-empty string." });
    }

    next();
}

function validarAtivo(req, res, next) {
    const { ativo } = req.body;
    if (typeof ativo !== "undefined" && typeof ativo !== "boolean") {
        return res.status(400).send({ message: "Ativo must be a boolean value." });
    }
    next();
}

module.exports = {
    validarCPF,
    validarNome,
    validarAtivo
};