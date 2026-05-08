import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, getTotalPrice, clearCart } = useAuth();
  const navigate = useNavigate();
  const img_url = "https://josephdebug.alwaysdata.net/static/images/";

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>🛒 Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <button className="btn btn-warning" onClick={clearCart}>
          🗑️ Clear Cart
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.product_id} className="cart-item">
              <img 
                src={img_url + item.product_photo} 
                alt={item.product_name}
                className="cart-item-image"
              />
              
              <div className="cart-item-details">
                <h5>{item.product_name}</h5>
                <p className="text-muted">{item.product_description?.slice(0, 80)}...</p>
                <p className="price">Kes {item.product_cost}</p>
              </div>

              <div className="cart-item-quantity">
                <button 
                  className="btn-qty"
                  onClick={() => updateCartQuantity(item.product_id, (item.quantity || 1) - 1)}
                >
                  −
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity || 1}
                  onChange={(e) => updateCartQuantity(item.product_id, parseInt(e.target.value))}
                  className="qty-input"
                />
                <button 
                  className="btn-qty"
                  onClick={() => updateCartQuantity(item.product_id, (item.quantity || 1) + 1)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-subtotal">
                <p>Kes {item.product_cost * (item.quantity || 1)}</p>
              </div>

              <button 
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item.product_id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>Kes {totalPrice}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span className="text-success">Free</span>
          </div>
          <div className="summary-item">
            <span>Tax:</span>
            <span>Kes 0</span>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total:</span>
            <span className="total-price">Kes {totalPrice}</span>
          </div>

          <button 
            className="btn btn-success btn-lg w-100"
            onClick={() => navigate("/makepayment", { state: { cartItems: cart, totalPrice } })}
          >
            💳 Proceed to Checkout
          </button>

          <button 
            className="btn btn-outline-primary btn-lg w-100 mt-2"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
