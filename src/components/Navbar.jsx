import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout, setSearchQuery, cart, wishlist } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      navigate("/?search=" + searchInput);
      setSearchInput("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowProfileMenu(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  const handleNavigation = (path) => {
    if (!isAuthenticated && path !== '/') {
      navigate("/signin");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-secondary navbar-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img className='Navbarlogo' src="/logo1.png" alt="Logo" /> 
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Search Bar */}
          <form className="d-flex mx-3 flex-grow-1" onSubmit={handleSearch}>
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="Search for products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search"
            />
            <button className="btn btn-outline-light search-btn" type="submit">
              🔍
            </button>
          </form>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-buttons">
            {/* Home Button */}
            <li className="nav-item">
              <button 
                className="nav-link btn-emoji"
                onClick={() => navigate("/")}
                title="Home"
              >
                🏠 Home
              </button>
            </li>

            {!isAuthenticated ? (
              <>
                {/* Sign In Button */}
                <li className="nav-item">
                  <button 
                    className="nav-link btn-emoji btn-signin"
                    onClick={() => navigate("/signin")}
                    title="Sign In"
                  >
                    👤 Sign In
                  </button>
                </li>

                {/* Sign Up Button */}
                <li className="nav-item">
                  <button 
                    className="nav-link btn-emoji btn-signup"
                    onClick={() => navigate("/signup")}
                    title="Sign Up"
                  >
                    ✍️ Sign Up
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Add Products Button */}
                <li className="nav-item">
                  <button 
                    className="nav-link btn-emoji"
                    onClick={() => navigate("/addproducts")}
                    title="Add Products"
                  >
                    ➕ Add
                  </button>
                </li>

                {/* Wishlist Button */}
                <li className="nav-item">
                  <button 
                    className="nav-link btn-emoji position-relative"
                    onClick={handleWishlistClick}
                    title="Wishlist"
                  >
                    ❤️ Wishlist
                    {wishlist.length > 0 && (
                      <span className="badge bg-danger badge-count">{wishlist.length}</span>
                    )}
                  </button>
                </li>

                {/* Cart Button */}
                <li className="nav-item">
                  <button 
                    className="nav-link btn-emoji position-relative"
                    onClick={handleCartClick}
                    title="Cart"
                  >
                    🛒 Cart
                    {cart.length > 0 && (
                      <span className="badge bg-danger badge-count">{cart.length}</span>
                    )}
                  </button>
                </li>

                {/* User Profile Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link btn-emoji"
                    id="profileDropdown"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    title="Profile"
                  >
                    👥 {user?.username || "Profile"}
                  </button>
                  {showProfileMenu && (
                    <div className="dropdown-menu show profile-menu">
                      <div className="profile-header">
                        <p className="profile-email">{user?.email}</p>
                        <p className="profile-username">{user?.username}</p>
                      </div>
                      <hr />
                      <button 
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;