import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';

const Subtotal = () => {
    const history = useHistory();
    const [{ basket }, dispatch] = useStateValue();
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items):
                            <strong>{value}</strong>
                        </p>
                        <small className="subtotal-gift">
                            <input type="checkbox"/> 
                            This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2} /*go to 2 decimal places*/
                value={getBasketTotal(basket)} /*subtotal amount*/
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={e => history.push('/payment')}>Proceed to Checkout</button> {/*used history.push instead of link to keep the button styling*/}
        </div>
    );
}
 
export default Subtotal;