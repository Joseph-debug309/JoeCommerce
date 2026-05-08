import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import MyButton from './MyButton';
import { useAuth } from '../context/AuthContext';
import '../css/Makepayments.css';

const Makepayment = () => {
    const location = useLocation();
    const { product, cartItems, totalPrice } = location.state || {};

    const navigate = useNavigate();
    const { clearCart } = useAuth();

    const img_url = "https://josephdebug.alwaysdata.net/static/images/";

    // Determine if it's a single product or multiple items
    const isSingleProduct = !!product;
    const items = cartItems || (product ? [product] : []);
    const totalAmount = totalPrice || (product ? product.product_cost : 0);

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formdata = new FormData();
            formdata.append("phone", number);
            formdata.append("amount", totalAmount);

            const response = await axios.post("https://josephdebug.alwaysdata.net/api/mpesa_payment", formdata);

            setLoading(false);
            setSuccess(response.data.message);

            if (cartItems) {
                clearCart();
            }

            setTimeout(() => {
                setSuccess("");
                navigate("/");
            }, 3000);
        } catch (error) {
            setLoading(false);
            setError(error.message);

            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className='row justify-content-center'>
            <h1 className="text-success">Make Payment - Lipa na M-Pesa</h1>

            <div className="col-md-1">
                <input 
                    type="button"
                    className="btn btn-primary"
                    value="<- Back"
                    onClick={() => navigate(cartItems ? "/cart" : "/")} 
                />
            </div>

            <div className="col-md-6 card shadow p-4">
                {isSingleProduct ? (
                    <>
                        <img src={img_url + product.product_photo} alt="Product name" className='product_img'/>
                        <div className="card-body ">
                            <h2 className="text-info"> {product.product_name} </h2>
                            <p className="text-light"> {product.product_description} </p>
                            <h3 className="text-warning">Kes {product.product_cost} </h3> <br />
                        </div>
                    </>
                ) : (
                    <div className="card-body">
                        <h2 className="text-info">Order Summary</h2>
                        <div className="order-items">
                            {items.map((item) => (
                                <div key={item.product_id} className="order-item">
                                    <img src={img_url + item.product_photo} alt={item.product_name} className="order-item-img" />
                                    <div className="order-item-details">
                                        <h5>{item.product_name}</h5>
                                        <p>Quantity: {item.quantity || 1}</p>
                                        <p className="text-warning">Kes {item.product_cost * (item.quantity || 1)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <h3 className="text-success">Total: Kes {totalAmount}</h3>
                    </div>
                )}

                <form onSubmit={handlesubmit}>
                    {loading && <Loader />}
                    <h3 className="text-success"> {success} </h3>
                    <h4 className="text-danger"> {error} </h4>

                    <input 
                        type="number"
                        className='form-control'
                        placeholder='Enter the Phone number 254XXXXXXX'
                        required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)} 
                    /> 
                    <br />

                    <MyButton 
                        type="submit"
                        value="Make Payment"
                        className='btn btn-success' 
                    />
                </form>
            </div>
        </div>
    );
};

export default Makepayment;