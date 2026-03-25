
import React from 'react'
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
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                style={styles.input}
              />
              <textarea
                className="form-control"
                rows="3"
                placeholder="Your message"
                style={styles.input}
              ></textarea>
              <button className="btn btn-primary w-100">
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
