//IT21005862
const router = require("express").Router();
const Souvenir = require("../models/souvenir");

//create product
router.post('/addItem', async(req, res)=> {
    try {
      const {ItemName,Description,Price,Category,Stocks,Image} = req.body;
      const souvenir = await Souvenir.create({ItemName,Description,Price,Category,Stocks,Image});
      console.log(souvenir);
      res.json("Item Added");
      const souvenirs = await Souvenir.find();
      res.status(201).json(souvenirs);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })

  module.exports = router;