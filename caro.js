const assert = require('assert');

let itemsBought = {
    userID : {
        itemID : 123,
        itemID : 123,
        itemID : 472
    }
} // map that keeps track of all the items a user has bought
let itemsSold = {
    userID : {
        itemID : 123,
        itemID : 123,
        itemID : 472
    } 
} // map that keeps track of all the items a user has sold
let listings = {
    itemID : {
        userID: 222,
        price: 40.99,
        description: "blue sweater from the 1980s",
        itemName: "vintage 80s sweater",
        image: "url"
    }
} // map that keeps track of all the items being sold on the marketplace

let cartItems = {
    userID:   {
        itemID: 123,
        itemID: 145
    }

}
/* 
createListing adds a new listing to our global state.
This function is incomplete. You need to complete it.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: The ID of the new listing
*/
function createListing(sellerID, price, blurb, image) {
    
}

/* 
getItemDetails returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: An object containing the price, blurb and image properties.
*/
function getItemDetails(listingID) {
    
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function allItemsSold(sellerID) {
    
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
function allListings() {
    
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/

function addtoCart (itemID, userID) {

}

function removefromCart (itemID, userID) {
    
}