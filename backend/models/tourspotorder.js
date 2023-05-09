//IT21013300
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourspotorderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
    product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourSpot",
    required: true,
  },

  productname : {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Complete'
  },
  Totaltickets : {
    type: String,
    default: 0
  },
  total : {
    type: String,
    default: 0
  },
  datebook: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toISOString().split('T')[0]
  },
  
});

const TourSpotorder = mongoose.model("TourSpotOrders", tourspotorderSchema);

module.exports = TourSpotorder;
