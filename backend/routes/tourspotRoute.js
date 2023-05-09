//IT21013300
const router = require("express").Router();
const mongoose = require("mongoose");
const TourSpot = require("../models/tourspot");
const User = require("../models/User");
const getalltourspots = require('./tourspotroutegetfunction');


// Get all tourspots
router.get('/getalltourspot', async (req, res) => {
  try {
    const tourspots = await getalltourspots();
    res.json({ tourspots });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch("/updateticketcount/:id", async (req, res) => {
  const { id } = req.params;
  const { NoTickets } = req.body;

  try {
    // Find the TourSpot by its ID
    const tourSpot = await TourSpot.findById(id);

    if (!tourSpot) {
      return res.status(404).json({ error: "TourSpot not found" });
    }

    // Update the ticket count
    tourSpot.NoTickets = NoTickets;

    // Save the updated TourSpot
    await tourSpot.save();

    // Return the updated TourSpot
    return res.json(tourSpot);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});



//add tourspots
router.post("/addtourspot", async (req, res) => {
  const { title, maindescription, description, image, image1, price, NoTickets, Address, Address1, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Unable To Find User By this ID" });
  }

  // check if tourspots array exists in the existingUser object, if not, define it
  if (!existingUser.tourspots) {
    existingUser.tourspots = [];
  }

  const tourspot = new TourSpot({
    title,
    maindescription,
    description,
    image,
    image1,
    price,
    NoTickets,
    Address,
    Address1,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await tourspot.save({ session });
    console.log(tourspot);
    existingUser.tourspots.push(tourspot);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ tourspot });
});

//Update tourspots
router.put("/updateTourSpot/:id", async (req, res) => {
  const { id } = req.params;
  const {title,   maindescription, description, image, image1, price, NoTickets, Address, Address1, user} = req.body;
  let tourspot;
  try {
    tourspot = await TourSpot.findByIdAndUpdate(id, {
      title,
      maindescription,
      description,
      image,
      image1,
      price,
      NoTickets,
      Address,
      Address1,
      user,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!tourspot) {
    return res.status(500).json({ message: "Unable To Update TourSpot" + id });
  }
  return res.status(200).json({ tourspot });
});

//Delete tourspots
router.delete("/deleteTourSpot/:id", async (req, res) => {
  const { id } = req.params;
  let tourspot;
  try {
    tourspot = await TourSpot.findByIdAndRemove(id).populate("user");
    await tourspot.user.tourspots.pull(tourspot);
    await tourspot.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!tourspot) {
    return res.status(500).json({ message: "Unable To Delete" });
  }

  return res.status(200).json({ message: "Successfull Delete" });
});

// Get a tour spot by ID
router.get("/getTourSpot/:id", async (req, res) => {
  const { id } = req.params;
  let tourspot;
  try {
    tourspot = await TourSpot.findById(id).populate("user");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to find TourSpot" });
  }

  if (!tourspot) {
    return res.status(404).json({ message: "TourSpot not found" });
  }

  return res.status(200).json({ tourspot });
});


//Get a user tourspots
router.get("/fuser/:id", async (req, res) => {
  const userId = req.params.id;
  let userTourSpot;
  try {
    userTourSpot = await TourSpot.find({ user: userId });
  } catch (err) {
    return console.log(err);
  }
  if (!userTourSpot) {
    return res.status(404).json({ message: "No TourSpot Found" });
  }
  return res.status(200).json({ user: userTourSpot });
});


module.exports = router;
