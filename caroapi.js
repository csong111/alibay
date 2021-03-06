const alibay = require('./alibay');
const express = require('express');
const app = express();

app.post('/putItemsBought', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let userID = body.userID;
    let itemID = body.itemID;
    res.send(JSON.stringify(alibay.putItemsBought(userID, itemID)));
});

app.get('/getItemsBought', (req, res) => {
    let userID = req.query.userID;
    res.send(JSON.stringify(alibay.getItemsBought(userID)));
});

app.post('/putItemsSold', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let userID = body.userID;
    let itemID = body.itemID;
    res.send(JSON.stringify(alibay.putItemsSold(userID, itemID)))
})

app.get('/getItemsSold', (req, res) => {
    let userID = req.query.userID;
    res.send(JSON.stringify(alibay.getItemsSold(userID)));
});

app.post('/createListing', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let sellerID = body.userID;
    let price = body.price;
    let description = body.description;
    let itemName = body.itemName;
    let image = body.image;
    res.send(JSON.stringify(alibay.createListing(sellerID, price, description, itemName, image)));
});

app.get('/getItemDetails', (req, res) => {
    let listingID = req.query.itemID;
    res.send(JSON.stringify(alibay.getItemDetails(listingID))); 
})

app.get('/allListings', (req, res) => {
    res.send(JSON.stringify(alibay.allListings()))
})

app.post('/addToCart', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let userID = body.userID;
    let itemID = body.itemID;
    res.send(JSON.stringify(alibay.addToCart(userID, itemID)))
})

app.post('/removeFromCart', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let userID = body.userID;
    let itemID = body.itemID;
})

app.get('/getCart', (res, req) => {
    let userID = req.query.userID;
    res.send(JSON.stringify(alibay.getCart(userID)));
})

app.get('/searchForListings', (req, res) => {
    let searchTerm = req.query.searchTerm;
    res.send(JSON.stringify(alibay.searchforListings(searchTerm)))
})

app.post('/buy', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let buyerID = body.userID;
    let sellerID = body.sellerID; 
    let itemID = body.itemID;
    res.send(JSON.stringify(alibay.buy(buyerID, sellerID, itemID)))
})

app.listen(5000, () => console.log('Listening on port 3000!'))
