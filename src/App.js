import React, { useEffect } from 'react';
import Header from './Header'; 
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Checkout from './Checkout';
import Login from './Login.js';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment'; 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe(
  "pk_test_51JFQ1nI3VUnIEjPWnM5HZyZrnhL0KTkYmJD1ehBwI3g1EijPuAOmUuBztCEfNH5dXdXp3wtG0Vg57rwn4bAtMxh1005ZMh2Znf"
); //asynchronously loads stripe script

function App() {
  const [{ basket }, dispatch] = useStateValue();
  useEffect(() => {
    //auth observer
    auth.onAuthStateChanged(authUser => { 
      if (authUser) {
        //the user is logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        }); 
      } else {
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    })
  }, []); //empty brackets = run only after initial render
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
//test test test