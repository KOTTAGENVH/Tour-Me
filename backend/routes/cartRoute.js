//IT21005862
const router = require("express").Router();
const Souvenir = require("../models/souvenir");
const Cart = require("../models/cartItem");

//add cart item
router.route("/addCart").post((req, res) => {

    const ItemId = req.body.ItemId;
    const ItemName = req.body.ItemName;
    const UnitPrice = req.body.UnitPrice;
    const Quantity = req.body.Quantity;
    const Total = req.body.Total;
    const Telephone = req.body.Telephone;

    const newSouvenir = new Cart({
        ItemId,
        ItemName,
        UnitPrice,
        Quantity,
        Total,
        Telephone
    })

    newSouvenir.save().then(() => {
        res.json("item added to cart")
    }).catch((err) => {
        console.log(err);
    })
})

//get all items in cart
router.route("/allCartitems").get((req, res) => {
    Cart.find().then((cartItems) => {
        res.json(cartItems)
    }).catch((err) => {
        console.log(err);
    })
})


router.route("/deleteCartItem/:id").delete(async (req, res) => {
    let itemId = req.params.id;

    await Cart.findByIdAndDelete(itemId)
        .then(() => {
            res.status(200).send({ status: "Cart Item deleted" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete from cart", error: err.message });
        })
})

// router.route("/updateitem/:id").put(async (req, res) => {
//     let itemId = req.params.id;

//     const ItemName = req.body.newItem.ItemName;
//     const Description = req.body.newItem.Description;
//     const Price = req.body.newItem.Price;
//     const Category = req.body.newItem.Category;
//     const Stocks = req.body.newItem.Stocks;
//     const Image = req.body.newItem.Image;

//     const updatedItem = {
//         ItemName,
//         Description,
//         Price,
//         Category,
//         Stocks,
//         Image
//     }

//     await Souvenir.findByIdAndUpdate(itemId, updatedItem)
//         .then(() => {
//             res.status(200).send({ status: "Souvenir updated", })
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).send({ status: "Error with upading Souvenir", error: err.message });
//         })
// })

router.route("/getitembytelephone/:id").get(async (req, res) => {
    let telephone = req.params.id;
    const items = await Cart.find({ Telephone: telephone })
        .then((items) => {
            res.status(200).send({ status: "Items fetched", items });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get items", error: err.message });
        })
})

module.exports = router;