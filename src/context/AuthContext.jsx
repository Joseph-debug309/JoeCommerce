import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }

    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCart([]);
    setWishlist([]);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.product_id === product.product_id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.product_id === product.product_id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product_id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.product_id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const addToWishlist = (product) => {
    const existingItem = wishlist.find(item => item.product_id === product.product_id);
    
    if (!existingItem) {
      setWishlist([...wishlist, { ...product, quantity: 1 }]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.product_id !== productId));
  };

  const moveWishlistToCart = (productId) => {
    const item = wishlist.find(item => item.product_id === productId);
    if (item) {
      addToCart(item);
      removeFromWishlist(productId);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product_cost * (item.quantity || 1)), 0);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        cart,
        wishlist,
        searchQuery,
        login,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        moveWishlistToCart,
        clearCart,
        getTotalPrice,
        setSearchQuery
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
