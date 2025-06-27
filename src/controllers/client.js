const service = require("../services/client")
const cpfUtils = require('cpf-utils')
//* PARSING THE INPUTS AND SENDING OUTPUTS, VALIDATION ESSENTIALY

function listClients(req, res) {
    let result = service.listClientsFromDB(req.query)
    //.then((emails) => {
    //    return res.send({ dados: emails })
    //})
    console.log("Query Params: ", req.query)
    return res.status(200).send({ dados: result })
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

//function create(req, res) {
//    service.create(req.body)
//        .then((emailCriado) => {
//            return res.status(201).send({
//                message: "Novo email criado com sucesso",
//                email: emailCriado
//            })
//        }, (error) => {
//            return res.status(500).send({ message: error })
//        })
//}
//
//function update(req, res) {
//    service.update(req.params.id, req.body)
//        .then((emailEditado) => {
//            if(!emailEditado)
//                return res.send({ message: "Email não foi encontrado"})
//
//            return res.send({
//                message: "Email editada com sucesso",
//                email: emailEditado
//            })
//        }, (error) => {
//            return res.status(500).send({ message: error })
//        })
//}
//
//function remove(req, res) {
//    service.remove(req.params.id)
//        .then((emailRemovido) => {
//            if(!emailRemovido)
//                return res.send({ message: "Email não foi encontrado"})
//
//            return res.send({
//                message: "Email removido com sucesso",
//                email: emailRemovido
//            })
//        }, (error) => {
//            return res.status(500).send({ message: error })
//        })
//}

module.exports = {
    listClients,
    create
}