import React from 'react';
import Subtotal from './Subtotal.js';
import './Checkout.css'
import { useStateValue } from './StateProvider.js';
import { FunctionalArticle } from './CheckoutProduct.js';
import FlipMove from 'react-flip-move';

const Checkout = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout-left">
                <img 
                    className="checkout-ad" 
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonPay/LPAOffers/April/Prime/Store/V2/LPA501_1500x250.jpg" 
                />
                <div>
                    <h3>Hello, {user ? user.email : 'Guest'}</h3>
                    <h2 className="checkout-title">Your Checkout Basket</h2>
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
            <div className="checkout-right">
                <Subtotal />
            </div>
        </div>
    );
}
 
export default Checkout;