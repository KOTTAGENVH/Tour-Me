//IT21013300
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourspotSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  maindescription: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  NoTickets: {
    type: String,
    required: true,
  },

  Address: {
    type: String,
    required: true,
  },

  Address1: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: false,
    default: "0"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  usertel: {
    type: String,
    required: true,
  },


});

const TourSpot = mongoose.model("TourSpot", tourspotSchema);

module.exports = TourSpot;
