//IT21005862
const router = require("express").Router();
const Souvenir = require("../models/souvenir");

//add item
router.route("/itemadd").post((req,res)=>{

  const ItemName = req.body.ItemName;
  const Description = req.body.Description;
  const Price = req.body.Price;
  const Category = req.body.Category;
  const Stocks = req.body.Stocks;
  const Image = req.body.Image;

  const newSouvenir = new Souvenir({
      ItemName,
      Description,
      Price,
      Category,
      Stocks,
      Image
  })

  newSouvenir.save().then(()=>{
      res.json("Souvenir Added")
  }).catch((err)=>{
      console.log(err);
  })
})

router.route("/allitems").get((req,res)=>{
  Souvenir.find().then((souvenirs)=>{
      res.json(souvenirs)
  }).catch((err)=>{
      console.log(err);
  })
})

router.route("/getCategories").get(async(req,res) =>{
  const categories = await Souvenir.find().distinct('Category')
  .then((categories) => {
      res.status(200).send({status: "Items fetched", categories});
  }).catch((err) =>{
      console.log(err.message);
      res.status(500).send({status: "Error with get categories", error: err.message});
  })
})

module.exports = router;