const assert = require('assert');
const express = require('express');
const app = express();
var fs = require('fs');

let itemsBought = {
    userID : [
        itemID,
        itemID,
        itemID
]
} // map that keeps track of all the items a user has bought
let itemsSold = {
    userID : [
        itemID,
        itemID,
        itemID
    ]
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
    userID:   [
        itemID,
        itemID
    ]
}
function genUID() {
    return Math.floor(Math.random() * 100000000)
}

function putItemsBought(userID, itemID) {
    itemsBought[userID] = itemID;
    fs.writeFileSync
}

function getItemsBought(userID) {
    var itemIDs = itemsBought[userID];
    if(itemIDs == undefined) {
        return {success: false, itemIDs: undefined};
    }
    return {success: true, itemIDs};
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

function putItemsSold(userID, itemID) {
    itemsSold[userID] = itemID;
}

function getItemsSold(userID) {
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
function createListing(sellerID, price, description, itemName, image) {
  let itemID = Math.floor(Math.random()*100000)
  listings[itemID] = {sellerID, price, description, itemName, image}    
  return {sucess: true, itemID};
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