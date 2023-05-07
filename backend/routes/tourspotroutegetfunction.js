//IT21013300
const TourSpot = require("../models/tourspot");
const User = require("../models/User");

//get all tourspots
async function getalltourspots() {

    try {
      const tourspots = await TourSpot.find().populate("user");
      return tourspots;

    } catch (err) {
      throw err;
    }
}

module.exports = getalltourspots; 


