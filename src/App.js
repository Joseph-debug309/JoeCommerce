import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayments';
import Notfound from './components/Notfound';
import ContainerComponent from './components/ContainerComponent';


function App() {
  return (
    <Router>
      <ContainerComponent>
      
      <header className="App-header">
        <h2>Welcome to JoeCommerce</h2>
      </header>

      

      <nav>
        <Link to="/" className='btn btn-primary m-2'>Home</Link>
        <Link to="/addproducts" className='btn btn-primary m-2'>Add Products</Link>
        <Link to="/signin" className='btn btn-primary m-2'>Sign In</Link>
        <Link to="/signup" className='btn btn-primary m-2'>Sign Up</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Getproducts/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/addproducts' element={<Addproducts/>} />
        <Route path='/makepayment' element={<Makepayment/>} />
        <Route path='*' element={<Notfound/>} />
      </Routes>

      <footer class="text-white p-2 bg-dark text-center">
      <b>Developed by Joseph. &copy; 2026 All Rights Reserved</b>
      </footer>

    </ContainerComponent>
    </Router>

    

    
  );
}

export default App;
