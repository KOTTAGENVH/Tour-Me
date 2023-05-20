import React, { useState, useEffect } from "react"
import axios from "axios";
import '../css/addSouvenir.css';
import { useParams } from "react-router";

function CartAdd(props) {

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8070/souvenir/getsingleitem/${id}`).then(res => {

      setItemId(id);
      setItemName(res.data.item.ItemName);
      setUnitPrice(res.data.item.Price);

    }).catch((err) => {
      alert(err.message)
    })
  }, [])

  const [ItemId, setItemId] = useState('');
  const [ItemName, setItemName] = useState('');
  const [UnitPrice, setUnitPrice] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Total, setTotal] = useState('');
  const [Telephone, setTelephone] = useState('');

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleUnitPriceChange = (event) => {
    setUnitPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleTotalChange = (event) => {
    Total = UnitPrice * Quantity;
    setTotal(event.target.value);
  };

  const handleTelephoneChange = (event) => {
    setTelephone(event.target.value);
  };

  const changeTotal = () => {
    const price = document.getElementById('price');
    const qt = document.getElementById('qty');
    const tot = document.getElementById('total');
  
    tot.value = price.value * qt.value;
    setTotal(tot.value);
  };

  function AddToCart(e) {
    e.preventDefault();

    const newItem = {
      ItemId,
      ItemName,
      UnitPrice,
      Quantity,
      Total,
      Telephone
    }

    axios.post('http://localhost:8070/cart/addCart', newItem).then(() => {
      alert("added to cart successfully");
    }).catch((err) => {
      alert(err)
    })
  }

  return (
    <form onSubmit={AddToCart} className="item-add-form">
      <center><h2>Add New Item to Cart</h2> </center>
      <label htmlFor="item-name">Item ID</label>
      <input
        type="text"
        id="item-name"
        name="item-name"
        value={ItemId}
        readOnly
      />

      <label htmlFor="description">Item Name</label>
      <textarea
        id="description"
        name="description"
        value={ItemName}
        onChange={handleItemNameChange}
        readOnly
      />

      <label htmlFor="price">Unit Price</label>
      <input
        type="text"
        id="price"
        name="price"
        value={UnitPrice}
        onChange={handleUnitPriceChange}
        readOnly
      />

      <label htmlFor="category">Quantity</label>
      <input
        type="text"
        placeholder="enter Qantity"
        id="qty"
        name="qty"
        value={Quantity}
        onChange={handleQuantityChange}
      />

      <label htmlFor="stock">Total</label>
      <input
        type="text"
        id="total"
        name="total"
        placeholder="click here to see total"
        value={Total}
        onClick={changeTotal}
        readOnly
      />

      <label htmlFor="image">Image</label>
      <input
        type="text"
        id="image"
        name="image"
        placeholder="Enter Telephone number"
        value={Telephone}
        onChange={handleTelephoneChange}
      />

      <button type="submit">Add To Cart</button>
    </form>
  );

};

export default CartAdd;