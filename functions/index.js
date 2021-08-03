const functions = require("firebase-functions"); //node.js doesn't auto include import syntax 
const express = require("express");
const cors = require("cors"); //security
const stripe = require("stripe")('sk_test_51JFQ1nI3VUnIEjPWRuZsnkUa56CY1dUVEPh6zHNV0Kg09GvoR1VfYyUq8TaIZHWDS13wSOHDGRVshDqffRCVqbmP00VVT0dLRH'); //Secret key

// - App config
const app = express(); //set up express server 

// - Middlewares
app.use(cors({ origin: true })); //allow cross-origin requests 
app.use(express.json()); //turn request data to json format

// - API roots 
app.get('/', (req, res) => res.status(200).send('hello world'));
app.post('/payment/create', async (req, res) => {
    const total = req.query.total;

    //console.log('Payment request received for this amount: ', total);

    //add payment entry
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    }); 
    // 201 = OK, created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    }); 
});

// - listen command (cloud function)
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-e2792/us-central1/api
// firebase hosting: https://clone-e2792.web.app/