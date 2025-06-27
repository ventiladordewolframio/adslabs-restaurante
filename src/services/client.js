const Client = require("../models/client")

//* DIRECT DB CONNECTION AND STUFF

function listClientsFromDB(queryParams) {
    //return await Email.findAll({ where: queryParams })
    return "testetstets"
}

async function create(dados) {
    // dados should be an object like: { name: "João", cpf: "12345678900" }
    const novoClient = await Client.create({
        name: dados.name,
        cpf: dados.cpf
    })
    return novoClient
}

//async function create(dados) {
//    const novoEmail = await Email.create(dados)
//
//    return novoEmail
//}
//
//async function update(idEmail, dados) {
//    const emailEncontrado = await Email.findByPk(idEmail)
//
//    if(emailEncontrado){
//        emailEncontrado.email = dados.email ?? emailEncontrado.email
//        emailEncontrado.pessoaId = dados.pessoaId ?? emailEncontrado.pessoaId
//        await emailEncontrado.save();
//    }
//
//    return emailEncontrado
//}
//
//async function remove(idEmail) {
//    const emailEncontrado = await Email.findByPk(idEmail)
//    if(emailEncontrado)
//        await emailEncontrado.destroy()
//
//    return emailEncontrado
//}

module.exports = {
    listClientsFromDB,
    create,
}