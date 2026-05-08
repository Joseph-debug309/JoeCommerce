import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import MyCarousel from './MyCarousel';
import { useAuth } from '../context/AuthContext';
import '../css/Getproducts.css';

const Getproducts = () => {

  //	We create a hook to get the products (1)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const [addedToCart, setAddedToCart] = useState(null);
  const [addedToWishlist, setAddedToWishlist] = useState(null);

  // Declare the navigate hook
  const navigate = useNavigate()
  const { addToCart, addToWishlist, isAuthenticated } = useAuth();

  // Declare the navigate hook// below we specifiy the image base url
  const img_url = "https://josephdebug.alwaysdata.net/static/images/"

  // Create a function to help you fetch products from your API (2)
  const fetchProducts = async() =>{

    // come up with the try and catch block (3)
    try{
      // Update the loading hook(4)
      setLoading(true)


      // Interact with your endpoint for fetching the products(5)
      const response = await axios.get("https://josephdebug.alwaysdata.net/api/get_products")

      // Update the products hook withthe response from the API(6)
      setProducts(response.data)
      setFilteredProducts(response.data)

      // Set the loading hook back to default (7)
      setLoading(false)

    }
    catch(error){
      // If there is an error(8)
      // set the loading hook back to default
      setLoading(false)


      // Update the error hook with a message
      setError(error.message)

    }
  }

  // Filter products based on search query
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, products]);

  // We shall use the useEffect hook that automatically re-render new features incase of any changes.
  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    addToCart(product);
    setAddedToCart(product.product_id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleAddToWishlist = (product) => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    addToWishlist(product);
    setAddedToWishlist(product.product_id);
    setTimeout(() => setAddedToWishlist(null), 2000);
  };

  const handlePurchaseNow = (product) => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    navigate("/makepayment", { state: { product } });
  };

  // console.log(products)

  const searchQuery = searchParams.get('search');

  return (
    <div className='products-container' >
      <MyCarousel/>
      
      <div className="products-header">
        <h3 className='text-primary'>Available Items</h3>
        {searchQuery && <p className="search-info">Showing results for: <strong>{searchQuery}</strong></p>}
      </div>

      { loading && <Loader/> }
      
      <h4 className='text-danger' >{error}</h4>

      {filteredProducts.length === 0 && !loading && (
        <div className="no-products">
          <p>No products found. {searchQuery ? 'Try a different search.' : 'Check back soon!'}</p>
        </div>
      )}

      {/* map thee products fetched from the api to the user interface */}

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.product_id} className="col-md-12 justify-content-center mb-3">
            <div className="card shadow product-card">
              <div className="product-image-container">
                <img src={img_url + product.product_photo} 
                alt="product name" 
                className='product_img' />
                <button 
                  className={`btn-wishlist ${addedToWishlist === product.product_id ? 'added' : ''}`}
                  onClick={() => handleAddToWishlist(product)}
                  title="Add to wishlist"
                >
                  {addedToWishlist === product.product_id ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="card-body">
                <h5 className="text-secondary product-name">{product.product_name.slice(0, 23)}...</h5>

                <p className="text-muted product-description"> {product.product_description.slice(0, 100)}... </p>

                <h4 className="text-warning product-price"> Kes {product.product_cost} </h4>

                <div className="product-buttons">
                  <button 
                    className={`btn btn-success btn-add-cart ${addedToCart === product.product_id ? 'added' : ''}`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedToCart === product.product_id ? '✓ Added' : '🛒 Add to Cart'}
                  </button>
                  
                  <button 
                    className="btn btn-outline-info btn-purchase" 
                    onClick={() => handlePurchaseNow(product)}
                  >
                    💳 Purchase Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        
        ))}
      </div>

      
    </div>
    
  )
}

export default Getproducts;


