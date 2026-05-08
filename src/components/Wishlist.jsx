import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveWishlistToCart } = useAuth();
  const navigate = useNavigate();
  const img_url = "https://josephdebug.alwaysdata.net/static/images/";

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="empty-wishlist">
          <h2>❤️ Your Wishlist is Empty</h2>
          <p>Add products to your wishlist to save them for later!</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>❤️ My Wishlist</h1>
        <p className="wishlist-count">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div key={item.product_id} className="wishlist-card">
            <div className="wishlist-image-container">
              <img 
                src={img_url + item.product_photo} 
                alt={item.product_name}
                className="wishlist-image"
              />
              <button 
                className="btn-remove-wishlist"
                onClick={() => removeFromWishlist(item.product_id)}
                title="Remove from wishlist"
              >
                ❌
              </button>
            </div>

            <div className="wishlist-content">
              <h5>{item.product_name}</h5>
              <p className="text-muted description">{item.product_description?.slice(0, 100)}...</p>
              
              <div className="wishlist-footer">
                <p className="price">Kes {item.product_cost}</p>
              </div>

              <div className="wishlist-buttons">
                <button 
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    moveWishlistToCart(item.product_id);
                    navigate("/cart");
                  }}
                >
                  🛒 Add to Cart
                </button>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFromWishlist(item.product_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="wishlist-actions">
        <button 
          className="btn btn-outline-primary"
          onClick={() => navigate("/")}
        >
          ← Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
