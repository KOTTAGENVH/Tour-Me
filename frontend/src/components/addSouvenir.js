import React, { useState } from "react"
import axios from "axios";
import '../css/addSouvenir.css';

export default function SouvenirAdd() {

  const [ItemName, setItemName] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState('');
  const [Category, setCategory] = useState('');
  const [Stocks, setStock] = useState('');
  const [Image, setImage] = useState('');

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  function Addsouvenir(e) {
    e.preventDefault();

    const newItem = {
        ItemName,
        Description,
        Price,
        Category,
        Stocks,
        Image
    }

    axios.post('http://localhost:8070/souvenir/itemadd', newItem).then(() => {
        alert("Souvenir added successfully");
    }).catch((err) => {
        alert(err)
    })
}

  return (
    <form onSubmit={Addsouvenir} className="item-add-form">
      <center><h2>Add New Souvenir Item</h2> </center>
      <label htmlFor="item-name">Item Name</label>
      <input
        type="text"
        placeholder="enter item name"
        id="item-name"
        name="item-name"
        value={ItemName}
        onChange={handleItemNameChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        placeholder="enter description"
        name="description"
        value={Description}
        onChange={handleDescriptionChange}
      />

      <label htmlFor="price">Price</label>
      <input
        type="text"
        placeholder="enter price"
        id="price"
        name="price"
        value={Price}
        onChange={handlePriceChange}
      />

      <label htmlFor="category">Category</label>
      <input
        type="text"
        placeholder="enter category"
        id="category"
        name="category"
        value={Category}
        onChange={handleCategoryChange}
      />

      <label htmlFor="stock">Stock</label>
      <input
        type="text"
        placeholder="enter stock"
        id="stock"
        name="stock"
        value={Stocks}
        onChange={handleStockChange}
      />

      <label htmlFor="image">Image</label>
      <input
        type="text"
        id="image"
        name="image"
        placeholder="paste image URL here"
        value={Image}
        onChange={handleImageChange}
      />

      <button type="submit">Add Item</button>
    </form>
  );

};
