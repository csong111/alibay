const assert = require('assert');
const alibay = require('./alibay');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const sha1 = require('sha1');

let users = JSON.parse(fs.readFileSync('./database/users.json').toString())
let sessionInfo = {}
let itemsBought = JSON.parse(fs.readFileSync('./database/itemsBought.json').toString())

let itemsSold = JSON.parse(fs.readFileSync('./database/itemsSold.json').toString())

let listings = JSON.parse(fs.readFileSync('./database/listings.json').toString()) 

let cartItems = JSON.parse(fs.readFileSync('./database/cartItems.json').toString())

function genUID() {
    return Math.floor(Math.random() * 100000000)
}

/* 
signUp creates a new user account.
    parameters: 
      [email] The email of the user
      [pw] The password of the user
      [firstName] The users first name
      [lastName] The users last name
    Creates a userID for the user.
    returns: {success : true} if the account was succesfull created, 
    returns: {success : false} if the account was not created
*/

function signUp(email, pw, firstName, lastName) {
    let userID = genUID()
    let currentUsers = [];
    let password = sha1(pw)
    Object.keys(users).forEach((user, ind) => {
        if (users[user].email === email) {
            currentUsers.push(users[user])
        }
    })
    if (currentUsers.length >= 1) {
        return { success: false }
    } else {
        users[userID] = { email, password, firstName, lastName }
        fs.writeFileSync('./database/users.json', JSON.stringify(users))
        return { success: true }
    }
}

/* 
login signs a user into their account. 
    parameters: 
      [email] The email of the user
      [pw] The password of the user
    returns: {success : true, sessionID}  if the sha1(password) provided by the user matches 
    the password in the users database, a sessionID is created and passed back.
    returns: {success : false} if the password provided is incorct
*/
function login(email, password) {
    let currentUserName=""
    let currentPassword=""
    let firstName=""
    let sessionID=""
    let userID=""

    Object.keys(users).forEach((user, ind) => {
        if (users[user].email === email){
            currentUserName= users[user].email
            currentPassword= users[user].password
            firstName = users[user].firstName
            userID = user
        }
    })
        if (currentUserName === email && currentPassword === sha1(password)) {
            sessionID = Math.floor(Math.random() * 10000000);
            return { success: true, sessionID, firstName, userID, email }
        } else {
            return { success: false }
        }
}


function putItemsBought(userID, itemID) {
    itemsBought[userID] = itemID;
    fs.writeFileSync('./database/itemsBought.json', JSON.stringify(itemsBought))
    return {success: true}
}

function getItemsBought(userID) {
    var itemIDs = itemsBought[userID];
    console.log(itemIDs)
    if(itemIDs == undefined) {
        return {success: false, itemIDs: []};
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
function createListing(sellerID, price, description, itemName, image, tags, category, stock) {
    let itemID = Math.floor(Math.random()*100000);
    listings[itemID] = {sellerID, price, description, itemName, image, tags, category, stock};   
    //console.log(sellerID)
    fs.writeFileSync('./database/listings.json', JSON.stringify(listings));
    return {success: true, itemID};
  }
/* 
getItemDetails returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: An object containing the price, blurb and image properties.
*/
function getItemDetails(listingID) {
    let details = listings[listingID];
    //console.log(listingID)
    return {success: true, details};
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
    let items = listings[listingID];
    items.stock = false;
    fs.writeFileSync('./database/listings.json', JSON.stringify(listings));
    return {success: true, items}
}
/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function allItemsSold(sellerID) {
    let itemIDs = itemsSold[sellerID];
    return {success: true, itemIDs}
}
/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
function allListings() {
    //let itemIDs = Object.keys(listings);
    return {success: true, listings}
}
/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
function searchforListings (searchTerm) {
    let splitTerms = searchTerm.split(', ');
    let itemIDs = Object.keys(listings).filter((itemID) => { 
        let item = listings[itemID];
        if (splitTerms.some(term => item.itemName.includes(term)) || 
        splitTerms.some(term => item.description.includes(term)) || 
        splitTerms.some(term => item.tags.includes(term))) return true;
        return false;
    }) 
    return {success: true, itemIDs};
}

function addToCart (userID, itemID) {
    cartItems = JSON.parse(fs.readFileSync('./database/cartItems.json').toString())
    if(cartItems[userID]){cartItems[userID].push(itemID);}else{cartItems[userID] = [itemID]}
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
    cartItems = JSON.parse(fs.readFileSync('./database/cartItems.json').toString())
    console.log(cartItems[userID])
    let itemIDs = cartItems[userID]
    return {success: true, itemIDs}
}


module.exports = {
    signUp,
    login,
    genUID, // This is just a shorthand. It's the same as genUID: genUID. 
    putItemsBought,
    getItemsBought,
    initializeBuyer,
    putItemsSold,
    getItemsSold,
    initializeSeller,
    allItemsBought,
    createListing,
    getItemDetails,
    buy,
    allItemsSold,
    allListings,
    searchforListings,
    addToCart,
    removeFromCart,
    getCart
    // Add all the other functions that need to be exported
}
