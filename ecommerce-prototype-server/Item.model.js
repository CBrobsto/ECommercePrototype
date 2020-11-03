const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
    item_description: {
        type: String
    },
    item_id: {
        type: String
    },
    item_quantity: {
        type: String
    },
    item_price: {
        type: String
    }
});

module.exports = mongoose.model('Item', Item);
