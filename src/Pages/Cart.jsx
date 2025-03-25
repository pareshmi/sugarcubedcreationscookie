import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "./CSS/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.new_price) || 0;
    const qty = item.quantity || 1;
    return sum + price * qty;
  }, 0);

  if (cartItems.length === 0) {
    return <div className="cart-container empty">Your cart is empty 🛒</div>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="item-details">
            <h3>{item.name}</h3>
            <p>${parseFloat(item.new_price).toFixed(2)}</p>

            <div className="quantity-control">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <button onClick={() => removeFromCart(item.id)} className="remove">
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
