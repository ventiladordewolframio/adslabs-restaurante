const Client = require('./client');
const Item = require('./item');
const Purchase = require('./purchase');

// Define associations here, after all models are loaded
Purchase.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Purchase.belongsTo(Item, { foreignKey: 'itemId', as: 'item' });
Item.hasMany(Purchase, { foreignKey: 'itemId', as: 'purchases' });


module.exports = {
    Client,
    Item,
    Purchase
};