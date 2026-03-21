import axios from 'axios';
import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';


const Signup = () => {

  const navigate = useNavigate();
  // Initialize the hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

//Define the three states of the application
  const [loading, setLoading] = useState("");
  const [success, setSucess] = useState("");
  const [error, setError] = useState("");

  

  // Below is a function that will handle the submit function
  const handleSubmit = async(e) => {
    // Below we prevent our site from reloading
    e.preventDefault()

    //Update our loading hook with a message that will display to the user interface as they are trying to register
    setLoading("Please wait as we process yor request...")

  

    
try {
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("phone", phone);

  const response = await axios.post("http://josephdebug.alwaysdata.net/api/signup", formdata);

  setLoading("");
  setSucess(response.data.message);
  setError("");

  // Clear hooks
  setUsername("");
  setEmail("");
  setPassword("");
  setPhone("");

  // Redirect to the login page (or dashboard) after a 2-second delay
  setTimeout(() => {
    navigate('/signin'); // Change '/signin' to your desired route
  }, 2000);

} catch (error) {
  setLoading("");
  // Tip: Check if the error has a response message from the server
  setError(error.response?.data?.message || error.message);
}
      // Update the error hook with the message given from the response
      setError(error.message)

    }

  return (
    <div className='row justify-content-center mt-4'>
      <div className="card col-md-6 shadow p-4">
         <h1 className='text-primary'>Sign Up</h1>
         <h5 className="text-warning">{loading}</h5>
         <h3 className="text-success">{success}</h3>
         <h4 className='text-danger'>{error}</h4>

         <form onSubmit={handleSubmit}>
          <input type="text" 
          placeholder='Enter the username'
          className='form-control'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required/>
          <br />

          {/*{username}*/}

          <input type="email"
          placeholder='Enter your Email Adress'
          className='form-control' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          /> <br />

          {/*{email}*/}

          <input type="password"
          placeholder='Enter your password'
          className='form-control' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          /> <br />

          {/*{password}*/}

          <input type="tel"
          placeholder='Enter your Mobile number'
          className='form-control' 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          /> <br />

          
          {/*{phone}*/}
        

          <input type="submit" value="signup" className='btn btn-primary' />
          <br /><br />

          Already have an account? <Link to={'/signin'}>Signin</Link>

         </form>
      </div>
    </div>
  )
}

export default Signup;

// Research on Axios module in reactjs
// How to secure data from being registered succesfully