import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  
  // Define the two hooks for capturing/storing the user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare the three additional hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Below we have the useNavigate hook to redirect us to another pg on sucessfull signin
  const navigate = useNavigate()

  // below is th e function to handle the signin function
  const handlesubmit = async (e) => {
    // prevent the site from reloading
    e.preventDefault()

    // Update the loading hook with a message
    setLoading("Please wait as we authenticate your account")

  try{
    // Create a formData object that will hold the email and the password
    const formdata = new FormData()

    //Insert/append the email and the password on the formData created.
    formdata.append("email", email);
    formdata.append("password", password)
    //  Interact with axios module that will help you connect to the https protocal as you pass in your URL and the data.
    const response = await axios.post("http://kbenkamotho.alwaysdata.net/api/signin", formdata)

    // ⦁	Set the loading hook back to default
    setLoading("");

    // Check whether the user exists as part of your response from the API
    if(response.data.user){
      // If user is there definitely the details entered during signin are correct
      // setSuccess("Login successful")
      // If it is sucessfull, let the person be redirected to the home page
      navigate("/")
    }
    else{
      // User is not found, meaning details are incorrect
      setError("login failed. Please try again...")
    }
  }
  catch(error){
    // Set loading back to default
    setLoading("")

    // Update the error hook with a message
    setError("Oooops something went wrong. Try again")

    
  }

}


  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 card shadow p-4">
        <h1 className='text-primary'>Sign In</h1>

        <h5 className="text-secondary">{loading}</h5>
        <h3 className="text-sucess">{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handlesubmit}>
          <input type="email"
          placeholder='Enter Your Email Adress here...'
          className='form-control'
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/> <br />

          {/*{email}*/}

          <input type="password"
          placeholder='Enter Your Password...'
          className='form-control'
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/> <br />

          <input type="submit"
          value="Sign In"
          className='btn btn-primary' /> <br />
          Don't have an account? <Link to={'/signup'}>Register</Link>
        </form>
      </div>
    </div>
  )
}

export default Signin;

// 
