const alibay = require('./alibay')
const express = require('express')
const app = express()

app.post('/createListing', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let serllerId = body.sellerID;
    let price = body.price;
    let description = body.description;
    let image = body.image;
    res.send(JSON.stringify(alibay.createListing(sellerID, price, description, itemName, image)));
});

app.listen(3000, () => console.log('Listening on port 3000!'))
