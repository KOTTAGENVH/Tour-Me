const mongoose = require('mongoose');
//IT21005862
const Schema = mongoose.Schema;

const cartschema = new Schema({

    ItemId: {
        type: String,
        required: true
    },
    ItemName: {
        type: String,
        required: true
    },
    UnitPrice: {
        type: String,
        required: true
    },
    Quantity: {
        type: String,
        required: true,
    },
    Total: {
        type: String,
        required: true,
    },
    Telephone: {
        type: String,
        required: true,
    }
})

const souvenir = mongoose.model("cart", cartschema);

module.exports = souvenir;