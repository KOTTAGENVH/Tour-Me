//IT21005862
const router = require("express").Router();
const Souvenir = require("../models/souvenir");

//add item
router.route("/itemadd").post((req, res) => {

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

    newSouvenir.save().then(() => {
        res.json("Souvenir Added")
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/allitems").get((req, res) => {
    Souvenir.find().then((souvenirs) => {
        res.json(souvenirs)
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/getsingleitem/:id").get(async (req, res) => {
    let itemId = req.params.id;
    const items = await Souvenir.findById(itemId)
        .then((item) => {
            res.status(200).send({ status: "Souvenir fetched", item });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get Souvenir", error: err.message });
        })
})

router.route("/deleteitem/:id").delete(async (req, res) => {
    let itemId = req.params.id;

    await Souvenir.findByIdAndDelete(itemId)
        .then(() => {
            res.status(200).send({ status: "Souvenir deleted" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete souvenir", error: err.message });
        })
})

router.route("/updateitem/:id").put(async (req, res) => {
    let itemId = req.params.id;

    const ItemName = req.body.newItem.ItemName;
    const Description = req.body.newItem.Description;
    const Price = req.body.newItem.Price;
    const Category = req.body.newItem.Category;
    const Stocks = req.body.newItem.Stocks;
    const Image = req.body.newItem.Image;

    const updatedItem = {
        ItemName,
        Description,
        Price,
        Category,
        Stocks,
        Image
    }

    await Souvenir.findByIdAndUpdate(itemId, updatedItem)
        .then(() => {
            res.status(200).send({ status: "Souvenir updated", })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with upading Souvenir", error: err.message });
        })
})

router.route("/getCategories").get(async (req, res) => {
    const categories = await Souvenir.find().distinct('Category')
        .then((categories) => {
            res.status(200).send({ status: "Items fetched", categories });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get categories", error: err.message });
        })
})

router.route("/getitembycategory/:id").get(async (req, res) => {
    let category = req.params.id;
    const souvenirs = await Souvenir.find({ Category: category })
        .then((souvenirs) => {
            res.status(200).send({ status: "Items fetched", souvenirs });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get items", error: err.message });
        })
})

module.exports = router;