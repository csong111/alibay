const alibay = require('./alibay');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')


app.use(bodyParser.raw({ type: "*/*", limit: '50mb' }))

    app.use(express.static('images'))

app.post('/login', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let email = body.email
    let password = body.password
    let loginResponse = alibay.login(email,password)
    if (!loginResponse.success) {
        res.send(JSON.stringify({success:false}))
        console.log("fail")
    } else {
    res.set('Set-Cookie', loginResponse.sessionID)
    let sessionID = loginResponse.sessionID
    let firstName = loginResponse.firstName
    let userID = loginResponse.userID
    res.send(JSON.stringify({success: true, sessionID, firstName, userID}))
    console.log("success!")
    }
});

app.post('/signup', (req, res) => {
    let body = JSON.parse(req.body.toString());
    if( body.email && body.password && body.firstName && body.lastName){
        let email = body.email
        let password = body.password
        let firstName = body.firstName
        let lastName = body.lastName
        res.send(JSON.stringify(alibay.signUp(email, password, firstName, lastName)));    
    }else{
        res.send(JSON.stringify({ success: false }))
    }
});

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


app.post('/uploadPic', (req, res) => {
    var extension = req.query.ext;
    var randomString = '' +  Math.floor(Math.random() * 10000000);
    var randomFilename = randomString + '.' + extension;
    fs.writeFileSync('images/' +  randomFilename, req.body);
    res.send(randomFilename);
})

app.post('/createListing', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let sellerID = body.userID;
    let price = body.price;
    let description = body.description;
    let itemName = body.itemName;
    let image = body.image;
    let tags = body.tags;
    let stock = true;
    res.send(JSON.stringify(alibay.createListing(sellerID, price, description, itemName, image, tags, stock)));
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

app.listen(4000, () => console.log('Listening on port 4000!'))
