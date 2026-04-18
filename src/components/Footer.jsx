import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#222',
      color: '#fff',
      padding: '40px 0',
      marginTop: '50px'
    },
    heading: {
      marginBottom: '15px'
    },
    input: {
      marginBottom: '10px'
    },
    link: {
      color: '#bbb',
      textDecoration: 'none',
      display: 'block',
      marginBottom: '5px'
    }
  }

// Define the two hooks that will store the inputs
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Declare the three additional hooks
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Below we have the useNavigate hook to redirect us to another pg on sucessfull signin
  const navigate = useNavigate()

    // Below is the function that will handle the submit message function
    const handlesubmit = async (e) => {
    // prevent the site from reloading
    e.preventDefault()

    // Update the loading hook with a message
    setLoading("Please wait as we submit your data")

  try{
    // Create a formData object that will hold the email and the message
    const formdata = new FormData()

    //Insert/append the email and the password on the formData created.
    formdata.append("email", email);
    formdata.append("message", message)

    //  Interact with axios module that will help you connect to the https protocal as you pass in your URL and the data.
    const response = await axios.post("http://josephdebug.alwaysdata.net/api/contact_us", formdata)

    // ⦁	Set the loading hook back to default
    setLoading("");

    // Check whether the user exists as part of your response from the API
    if(response.data.user){
      // If user is there definitely the details entered during signin are correct
      // setSuccess("Login successful")
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
    <footer style={styles.footer}>
      <div className="container">
        <div className="row">
         
          {/* About Us */}
          <div className="col-md-4">
            <h5 style={styles.heading}>About Us</h5>
            <p>
              The platform integrates advanced generative AI for hyper-personalized shopping experiences and real-time inventory forecasting. Velocity Collective establishes the "Founders’ Fund," investing in next-generation sustainable packaging solutions.

              As we look forward, Velocity Collective is focused on full supply chain transparency and achieving complete carbon neutrality by 2028. We are not just building an e-commerce platform; we are building a movement toward responsible consumption, powered by technology.
            </p>
          </div>

          {/* Contact Form */}
          <div className="col-md-4">
            <h5 style={styles.heading}>Contact Us</h5>
            <form>

              <h5 className="text-secondary">{loading}</h5>
              <h3 className="text-sucess">{success}</h3>
              <h4 className="text-danger">{error}</h4>

              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                style={styles.input}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

                {/* {email} */}

              <textarea
                className="form-control"
                rows="3"
                placeholder="Your message"
                style={styles.input}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>


              <button 
              className="btn btn-primary w-100"
              type="submit">
                Send
              </button>


            </form>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h5 style={styles.heading}>Follow Us</h5>
            <a href="www.facebook.com" style={styles.link}>Facebook</a>
            <a href="https//www.x.com" style={styles.link}>Twitter</a>
            <a href="www.instagram.com" style={styles.link}>Instagram</a>
          </div>

        </div>

        <hr style={{ borderColor: '#444' }} />

        <p className="text-center mb-0">
          © {new Date().getFullYear()} By Joseph. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer;
