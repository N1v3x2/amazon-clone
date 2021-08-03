import React, { useEffect, useState } from 'react';
import { FunctionalArticle } from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import FlipMove from 'react-flip-move';
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { db } from './firebase';

const Payment = () => {
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the stripe secret (basically a unique id to keep track of the current basket)
        const getClientSecret = async () => {
            //axios sends request and receives response from Stripe API
            const response = await axios({ 
                method: 'post',
                //Stripe expects the total in a currency subunit (e.g. send cents instead of dollars)
                url: `/payment/create?total=${getBasketTotal(basket) * 100}` //? = query parameter 
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    const handleSubmit = async (event) => { 
        event.preventDefault(); //stops page from refreshing 
        setProcessing(true);
        
        //confirmCardPayment returns either the successful paymentIntent promise or an error
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created //date created
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY_BASKET'
            });
            history.replace('/orders'); //change the page; prevents user from going back to payment page
        }) //can put a .catch() here
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : ""); 
    }

    return ( 
        <div className='payment'>
            <div className="payment-container">
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment-address">
                        <p>{user?.email}</p>
                        <p>123 React Ln</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment-items">
                        {basket.map(item => (
                            <FlipMove leaveAnimation="fade">
                                <FunctionalArticle 
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            </FlipMove>
                        ))}
                    </div>
                </div>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment-details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment-price-container">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2} /*go to 2 decimal places*/
                                    value={getBasketTotal(basket)} /*subtotal amount*/
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Payment;