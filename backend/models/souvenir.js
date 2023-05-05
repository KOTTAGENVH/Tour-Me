const mongoose = require('mongoose');
//IT21005862
const Schema = mongoose.Schema;

const souvenirschema = new Schema({

    ItemName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true,
    },

    Stocks: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
    },
})

const souvenir = mongoose.model("souvenirs", souvenirschema);

module.exports = souvenir;