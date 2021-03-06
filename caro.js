const assert = require('assert');
const express = require('express');
const app = express();
var fs = require('fs');

let itemsBought = fs.readFileSync('./database/itemsBought.json')
//{
    //userID : [
        //itemID,
        //itemID,
        //itemID
//]
//} // map that keeps track of all the items a user has bought
let itemsSold = fs.readFileSync('./database/itemsSold.json')
//{
//     userID : [
//         itemID,
//         itemID,
//         itemID
//     ]
// } // map that keeps track of all the items a user has sold
let listings = fs.readFileSync('./database/listings.json') //{
//     itemID : {
//         userID: 222,
//         price: 40.99,
//         description: "blue sweater from the 1980s",
//         itemName: "vintage 80s sweater",
//         image: "url"
//     }
// } // map that keeps track of all the items being sold on the marketplace

let cartItems = fs.readFileSync('./database/cartItems.json')
//{
//     userID:   [
//         itemID,
//         itemID
//     ]
// }
function genUID() {
    return Math.floor(Math.random() * 100000000)
}

function putItemsBought(userID, itemID) {
    itemsBought[userID] = itemID;
    fs.writeFileSync('./database/itemsBought.json', JSON.stringify(itemsBought))
    return {success: true}
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
function initializeBuyer(userID) {
    var itemIDs = getItemsBought[userID];
    if(itemIDs == null) {
        putItemsBought(userID, []);
    }
}

/*repeat above process for itemsSold map */

function putItemsSold(userID, itemID) {
    itemsSold[userID] = itemID;
    fs.writeFileSync('./database/itemsSold.json', JSON.stringify(itemsSold))
    return {success: true}
}

function getItemsSold(userID) {
    var itemIDs = itemsSold[userID];
    if(itemIDs == undefined) {
        return {success: false, itemIDs: undefined};
    }
    return {success: true, itemIDs};
}

/*
initializeSeller adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: undefined
*/
function initializeSeller(userID) {
    var itemIDs = getItemsSold[userID];
    if(itemIDs == null) {
        putItemsSold(userID, []);
    }
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*/
function allItemsBought(buyerID) {
    let itemIDs = itemsBought[buyerID];
    return {success: true, itemIDs};    
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
  let itemID = Math.floor(Math.random()*100000);
  listings[itemID] = {sellerID, price, description, itemName, image};    
  fs.writeFileSync('./database/listings.json', JSON.stringify(listings));
  return {sucess: true, itemID};
}

/* 
getItemDetails returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: An object containing the price, blurb and image properties.
*/
function getItemDetails(listingID) {
    let details = listings[listingID];
    return {success: true, details};
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function allItemsSold(sellerID) {
    let itemIDs = itemsSold[serllerID];
    return {success: true, itemIDs}
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
function allListings() {
    let itemIDs = Object.keys(listings);
    return {success: true, itemIDs}
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/

function addToCart (itemID, userID) {
    cartItems[userID] = itemID;
    let itemIDs = cartItems[userID];
    fs.writeFileSync('./database/cartItems.json', JSON.stringify(cartItems));
    return {success: true, itemIDs}
}

function removeFromCart (itemID, userID) {
    delete cartItems[userID][itemID];
    let itemIDs = cartItems[userID];
    fs.writeFileSync('./database/cartItems.json', JSON.stringify(cartItems));
    return {success: true, itemIDs}
}

function getCart (userID) {
    let itemIDs = cartItems[userID]
    return {success: true, itemIDs}
}

function searchForListings (searchTerm) {
    let itemIDs = Object.keys(listings).filter((itemID) => { 
        let item = listings[itemID];
        if (item.itemName.includes(searchTerm) || item.description.includes(searchTerm)) return true;
        return false;
    }) 
    return {success: true, itemIDs};
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
function buy (buyerID, sellerID, listingID) {
    putItemsBought(buyerID, listingID);
    putItemsSold(sellerID, listingID);
    delete listings[listingID];
    fs.writeFileSync('./database/listings.json', JSON.stringify(listings));
    return {success: true}
}