const Client = require('./client');
const Item = require('./item');
const Purchase = require('./purchase');

// Define associations here, after all models are loaded
Purchase.belongsTo(Client, { foreignKey: 'clientId' });
Purchase.belongsTo(Item, { foreignKey: 'idItem' });

module.exports = {
    Client,
    Item,
    Purchase
};