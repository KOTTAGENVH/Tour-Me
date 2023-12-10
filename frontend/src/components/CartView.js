import React, { useState } from 'react';

const ShoppingCart = () => {

    const [param, setparam] = useState([])
    const [cartItems, setCartItems] = useState([]);

    const handleQuantityChange = (itemId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleTelehoneChange = (event) => {
        setparam(event.target.value);
      };

    function getitems(e) {
        e.preventDefault();
        // eslint-disable-next-line no-undef
        axios.get(`http://localhost:8070/cart/getitembytelephone/${param}`).then(res => {
            setCartItems(res.data.items)
        }).catch((err) => {
            alert(err.message)
        })
    }

    const handleRemoveItem = itemId => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.id !== itemId)
        );
    };

    return (
        <div>
            <form onSubmit={getitems} className="search-bar">
                <label htmlFor="search-option" className="option-label">Enter Your Telephone Number:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    // eslint-disable-next-line no-undef
                    value={UnitPrice}
                    onChange={handleTelehoneChange}
                    readOnly
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="cart-container">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={e =>
                                                handleQuantityChange(item.id, parseInt(e.target.value))
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleRemoveItem(item.id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;