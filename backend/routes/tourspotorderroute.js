//IT21013300
const router = require("express").Router();
const mongoose = require("mongoose");
const Orders = require("../models/tourspotorder");
const User = require("../models/User");

//get all tourspots
router.get("/getalltourspotorders", async (req, res) => {
  let orders;
  try {
    orders = await Orders.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!orders) {
    return res.status(404).json({ message: "No orders Found" });
  }
  return res.status(200).json({ orders });
});

//add tourspots
router.post("/addtourspotorders", async (req, res) => {
  const { user,seller, useremail, product,productname, status, Totaltickets, total,datebook,} = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Unable To Find User By this ID" });
  }

  // check if tourspotsorders array exists in the existingUser object, if not, define it
  if (!existingUser.orders) {
    existingUser.orders = [];
  }

  const orders = new Orders({
    user,
    seller,
    useremail,
    product,
    productname,
    status,
    Totaltickets,
    total,
    datebook,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await orders.save({ session });
    console.log(orders);
    existingUser.orders.push(orders);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ orders });
});

//Update tourspots orders
router.put("/updateTourSpotorders/:id", async (req, res) => {
  const { id } = req.params;
  const {user, useremail, product, status, Totaltickets, total,datebook,} = req.body;
  let orders;
  try {
    orders = await Orders.findByIdAndUpdate(id, {
      user,
      useremail,
      product,
      seller,
      productname,
      status,
      Totaltickets,
      total,
      datebook,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!orders) {
    return res.status(500).json({ message: "Unable To Update TourSpot orders" + id });
  }
  return res.status(200).json({ orders });
});

//Delete tourspots orders
router.delete("/deleteTourSpot/:id", async (req, res) => {
  const { id } = req.params;
  let orders;
  try {
    orders = await Orders.findByIdAndRemove(id).populate("user");
    await orders.user.orders.pull(order);
    await orders.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!orders) {
    return res.status(500).json({ message: "Unable To Delete" });
  }

  return res.status(200).json({ message: "Successfull Delete" });
});

// Get a tour spot by ID
router.get("/getTourSpot/:id", async (req, res) => {
  const { id } = req.params;
  let orders;
  try {
    orders = await Orders.findById(id).populate("user");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to find TourSpot" });
  }

  if (!orders) {
    return res.status(404).json({ message: "TourSpot not found" });
  }

  return res.status(200).json({ orders });
});


//Get a user tourspots orders
router.get("/fuser/:id", async (req, res) => {
  const userId = req.params.id;
  let userorders;
  try {
    userorders = await Orders.find({ user: userId });
  } catch (err) {
    return console.log(err);
  }
  if (!userorders) {
    return res.status(404).json({ message: "No TourSpot userorders Found" });
  }
  return res.status(200).json({ user: userorders });
});

router.get("/fdest/:sellerId", async (req, res) => {
  const sellerId = req.params.sellerId;
  let sellerOrders;
  try {
    sellerOrders = await Orders.find({ seller: { $regex: sellerId, $options: 'i' } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (sellerOrders.length === 0) {
    return res.status(404).json({ message: "No orders found for the specified seller" });
  }
  return res.status(200).json({ orders: sellerOrders });
});


module.exports = router;
