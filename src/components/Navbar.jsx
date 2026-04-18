import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container-fluid">

        <a className="navbar-brand" href="/">
          <img className='Navbarlogo' src="/logo1.png"/> 
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link " aria-current="page" href="/signup">
                Sign up
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link " aria-current="page" href="/signin">
                Sign in
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link " href="addproducts">
                Add Products
              </a>
            </li>

            
            
          </ul>
          
        </div>

      </div>
    </nav>
  );
};

export default Navbar;