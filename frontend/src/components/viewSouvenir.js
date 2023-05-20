import React, { useState, useEffect } from "react"
import axios from "axios";
import '../css/viewSouvenir.css';

function ItemGridView() {

    const [param, setparam] = useState([])
    const [categorylist, setcategorylist] = useState([])
    const [items, setitems] = useState([])

    useEffect(() => {
        function getcategories() {
            axios.get("http://localhost:8070/souvenir/getCategories").then((res) => {
                setcategorylist(res.data.categories);
                console.log(categorylist);
            }).catch((err) => {
                alert(err.message)
            })
        }
        getcategories();
    }, [])

    function getitems(e) {
        if(param==="all items"){
            getAll();
        }
        e.preventDefault();
        axios.get(`http://localhost:8070/souvenir/getitembycategory/${param}`).then(res => {
            setitems(res.data.souvenirs)
        }).catch((err) => {
            alert(err.message)
        })
    }

    function getAll() {
        axios.get("http://localhost:8070/souvenir/allitems").then((res) => {
            setitems(res.data);
        }).catch((err) => {
            alert(err.message)
        })
    }

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
        <div data-testid="viewSouvenir-1">
            <h2>View Souvenir</h2>
            <form onSubmit={getitems} className="search-bar">
                <label htmlFor="search-option" className="option-label">Search By Category:</label>
                <select id="search-option" onChange={(e) => { setparam(e.target.value) }} className="option-select">
                    <option value="all items">All Items</option>
                    {categorylist && categorylist.map((category, key) => (
                        <option key={key}>{category}</option>
                    ))}
                </select>
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="item-grid-view">
                {items && items.map((item, key) => (
                    <div key={item._id} className="item-card">
                        <img src={item.Image} alt={item.ItemName} className="item-image" />
                        <h3 className="item-name">{item.ItemName}</h3>
                        <p className="item-price">${item.Price}</p>
                        <button className="add-to-cart-button" style={{ backgroundColor: '#97FFFF' }}><a href={'/addcart/' + item._id}>Add to Cart</a></button>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ItemGridView;
