const { listClients } = require("../controllers/client")
//const Email = require("../models/client")
const Client = require("../models/client")
const Item = require("../models/item")
const Purchase = require("../models/purchase")

//* DIRECT DB CONNECTION AND STUFF

function listClientsFromDB(queryParams) {
    //return await Email.findAll({ where: queryParams })
    return "testetstets"

}

async function createClient(dados) {
    // dados should be an object like: { name: "João", cpf: "12345678900" }
    const novoClient = await Client.create({
        name: dados.name,
        cpf: dados.cpf
    })
    return novoClient
}

async function createItem(dados) {
    // dados: { name: "Pizza", price: 2500 }
    const novoItem = await Item.create({
        name: dados.name,
        price: dados.price
    })
    return novoItem
}

async function createPurchase(dados) {
    // dados: { clientId: 1, idItem: 2, quantity: 3, price_individual: 2500 }
    const novaCompra = await Purchase.create({
        clientId: dados.clientId,      // FK to clients table
        idItem: dados.idItem,          // FK to items table
        quantity: dados.quantity,
        price_individual: dados.price_individual
    })
    return novaCompra
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
    createClient,
    createItem,
    createPurchase
}