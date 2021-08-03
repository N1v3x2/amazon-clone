import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import './Header.css';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

const Header = () => { 
    const [{ basket, user }, dispatch] = useStateValue();
    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (  
        <div className='header'>
            <Link to="/">
                <img 
                    className="header-logo" 
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </Link>

            <div className="header-search">
                <input 
                    className="header-search-input"
                    type="text"
                />
                <SearchIcon className="header-search-icon"/>
            </div>

            <div cl assName="header-nav">
                <Link to={!user && "/login"}>
                    <div className="header-option" onClick={handleAuthentication}>
                        <span className="header-option-line-one">Hello {user ? user.email : 'Guest'}</span>
                        <span className="header-option-line-two">{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>

                <Link to={"/orders"}>
                    <div className="header-option">
                        <span className="header-option-line-one">Returns</span>
                        <span className="header-option-line-two">& Orders</span>
                    </div>
                </Link>

                <div className="header-option">
                    <span className="header-option-line-one">Your</span>
                    <span className="header-option-line-two">Prime</span>
                </div>
                <Link to="/checkout">
                    <div className="header-option-basket">
                        <ShoppingBasketIcon />
                        <span className="header-option-line-two header-basket-count">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
 
export default Header;