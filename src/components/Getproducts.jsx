import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Navigate, useNavigate } from 'react-router-dom';
import MyCarousel from './MyCarousel';

const Getproducts = () => {

  //	We create a hook to get the products (1)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Declare the navigate hook
  const navigate = useNavigate()

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



  // We shall use the useEffect hook that automatically re-render new features incase of any changes.
  useEffect(() => {
    fetchProducts()
  }, [])

  // console.log(products)


  return (
    <div className='row' >
    <MyCarousel/>
      <h3 className='text-primary' >Available Items</h3>

      { loading && <Loader/> }
      
      <h4 className='text-danger' >{error}</h4>

      {/* map thee products fetched from the api to the user interface */}

      {products.map((product) => (
        <div className="col-md-3 justify-content-center mb-3">
          <div className="card shadow">
          <img src={img_url + product.product_photo} 
          alt="product name" 
          className='product_img mt-3' />

            <div className="card-body">
            <h5 className="text-secondary">{product.product_name.slice(0, 23)}...</h5>

            <p className="text-light"> {product.product_description.slice(0, 100)}... </p>

            <h4 className="text-warning"> Kes {product.product_cost} </h4>

            {/* how to move the data of a given component to another component by use of the useNavigate() hook. */}
 
          <button className="btn btn-outline-info" onClick={() => navigate("/makepayment",{state: {product}})}>Purchase Now</button>

            </div>
          </div>
        </div>
      
      )  )}

      
    </div>
    
  )
}

export default Getproducts;
