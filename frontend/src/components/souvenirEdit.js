import React, { useState, useEffect } from "react"
import axios from "axios";
import '../css/addSouvenir.css';
import { useParams } from "react-router";

function SouvenirEdits(props) {

    const {id}=useParams();
    console.log("my id "+id);

    
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

    useEffect(() => {
        axios.get(`http://localhost:8070/souvenir/getsingleitem/${id}`).then(res => {

            setItemName(res.data.item.ItemName);
            setDescription(res.data.item.Description);
            setPrice(res.data.item.Price);
            setCategory(res.data.item.Category);
            setStock(res.data.item.Stocks);
            setImage(res.data.item.Image);

        }).catch((err) => {
            alert(err.message)
        })
    }, [])

    function sendUpdate(e) {
        e.preventDefault();

        const newItem = {
            ItemName,
            Description,
            Price,
            Category,
            Stocks,
            Image
        }

        axios.put(`http://localhost:8070/souvenir/updateitem/${id}`, { newItem })
            .then(() => {
                alert("Souvenir Updated Successfully");
            }).catch((err) => {
                alert(err)
                console.log(err);
            })
    }


    return (
        <form onSubmit={sendUpdate} className="item-add-form">
            <center><h2>Update Souvenir Item</h2> </center>
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

            <button type="submit">Update Item</button>
        </form>
    );

};

export default SouvenirEdits