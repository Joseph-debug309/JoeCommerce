import React, { useState , useRef } from 'react'
import Loader from './Loader';
import axios from 'axios';
import MyButton from './MyButton';

const Addproducts = () => {

  // Introduce the hook (2)
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  //create a reference

  const imageInputRef = useRef(null)


  // declare the additional hool to manage the states of the application (3)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ⦁	Come up with the function that will handle the submit function (4)
  const handleSubmit = async (e) =>{
    // Prevent the site from reloading
    e.preventDefault()

    // Set a loading hook activating it (5)
    setLoading(true)

     
// WE create the try and catch block (6)
    try{
      // create a form data (7)
      const formdata = new FormData()

      // append the details to the form data created (8)
      formdata.append("product_name", product_name)
      formdata.append("product_description", product_description)
      formdata.append("product_cost", product_cost)
      formdata.append("product_photo", product_photo)

      // interact with axios to access the method post (9)
      const response = await axios.post("http://josephdebug.alwaysdata.net/api/add_product", formdata)

      // set the loading hook back to default (10)
      setLoading(false)

      // Update the success hook with a message (11)
      setSuccess(response.data.message)

      // clearing the hooks (12)
      setProductName("");
      setProductDescription("");
      setProductCost("");
      imageInputRef.current.value= "";
      // setProductPhoto("");

      e.target.reset()

      setTimeout(() => {
        setSuccess("");
      }, 5000);
  }

  catch(error){
    // Set the loading hook back to default
    setLoading(false)

    // update the setError with a message
    setError(error.message)
  }
  }

  

//  ⦁	Creating the UI i.e product_details(1)

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 p-4 card shadow">
        <h3 className='text-primary'>Add Items</h3>

        {/* Bind the loading hooks */}
        {loading && <Loader/>}

        <h3 className="text-success">{success}</h3>
        <h4 className='text-danger'>{error}</h4>
      

        <form onSubmit={handleSubmit}>
          <input type="text" 
          placeholder='Enter the Item name'
          className='form-control'
          required 
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
           /> <br />

           {/*{product_name}*/}

           <input type="text" 
          placeholder='Enter the Item description'
          className='form-control'
          required 
          value={product_description}
          onChange={(e) => setProductDescription(e.target.value)}
           /> <br />

           {/*{product_description}*/}

           <input type="number" 
          placeholder='Enter the price of the Item'
          className='form-control'
          required 
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)}
           /> <br />

           {/*{product_cost}*/}

           <label className='text-primary'>Item photo</label>

           <input type="file"
           className='form-control' 
           required
           accept='image/*'
           onChange={(e) => setProductPhoto(e.target.files[0])} 
           ref={imageInputRef}/> <br />

           <MyButton type="submit" 
           value='Add Item'
           className='btn btn-outline-primary'
            />
           
        </form>
      </div>
      
    </div>
  )
}

export default Addproducts;
