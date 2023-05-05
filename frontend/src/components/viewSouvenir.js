import React, { useState, useEffect } from "react"
import axios from "axios";
import '../css/viewSouvenir.css';

function ItemGridView() {

    const [items, setitems] = useState([])
    const [param, setparam] = useState([])

    useEffect(() => {
        function getSouvenirs() {
            axios.get("http://localhost:8070/souvenir/allitems").then((res) => {
                setitems(res.data);
            }).catch((err) => {
                alert(err.message)
            })
        }
        getSouvenirs();
    }, [])

    return (
        <div className="item-grid-view">
            {items && items.map((item, key) => (
                <div key={item._id} className="item-card">
                <img src={item.Image} alt={item.ItemName} className="item-image" />
                <h3 className="item-name">{item.ItemName}</h3>
                <p className="item-price">${item.Price}</p>
                <button className="add-to-cart-button">Add to Cart</button>
            </div>
            ))}
        </div>
    );
};

export default ItemGridView;
