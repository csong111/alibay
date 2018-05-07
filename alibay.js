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
        itemName: "vintage 80s sweater"
    }
} // map that keeps track of all the items being sold on the marketplace

/*
Before implementing the login functionality, use this function to generate a new UID every time.
*/
function genUID() {
    return Math.floor(Math.random() * 100000000)
}

function putItemsBought(userID, value) {
    itemsBought[userID] = value;
}

function getItemsBought(userID) {
    var ret = itemsBought[userID];
    if(ret == undefined) {
        return null;
    }
    return ret;
}

/*
initializeBuyer adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: undefined
*/
function initializeBuyer(uid) {
    var items = getItemsBought[uid];
    if(items == null) {
        putItemsBought(uid, []);
    }
}

/*repeat above process for itemsSold map */

function putItemsSold(userID, value) {
    itemsSold[userID] = value;
}

function getItemSold(userID) {
    var ret = itemsSold[userID];
    if(ret == undefined) {
        return null;
    }
    return ret;
}

/*
initializeSeller adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: undefined
*/
function initializeSeller(uid) {
    var items = getItemsSold[uid];
    if(items == null) {
        putItemsSold(uid, []);
    }
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*/
function allItemsBought(buyerID) {
    return itemsBought[buyerID];    
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
buy changes the global state.
Another buyer will not be able to purchase that listing
The listing will no longer appear in search results
The buyer will see the listing in his history of purchases
The seller will see the listing in his history of items sold
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: undefined
*/
function buy(buyerID, sellerID, listingID) {
    
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
function searchForListings(searchTerm) {
    //if the searchTerm is in the itemTitle or itemBlurb, 
}

module.exports = {
    genUID, // This is just a shorthand. It's the same as genUID: genUID. 
    putItemsBought,
    getItemsBought,
    initializeBuyer,
    putItemsSold,
    getItemsSold,
    initializeSeller,
    //allItemsBought,
    createListing,
    getItemDetails,
    buy,
    //allItemsSold,
    allListings,
    searchforListings
    // Add all the other functions that need to be exported
}
