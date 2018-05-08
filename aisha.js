const alibay = require('./alibay')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require("fs")

let users = {
    4145241: {
        email: "email@email.com",
        firstName: "Mary",
        lastName: "doe",
        password: "password"
    }
}

let sessionInfo={}
    
try {
    users = JSON.parse(fs.readFileSync('../users.json').toString())
} catch (err) {
}
function genUID() {
    return Math.floor(Math.random() * 100000000)
}

function signUp (email, password, firstName, lastName){
    let userID = genUID
    while (users[userID]){
        let userID = genUID
    }

    Object.keys(users.forEach((user,ind) =>{
        if (users[user].email === email){
            return {success:false}
        }
    }))
    users[userID] = {email, password, firstName, lastName}
    fs.writeFileSync('../users.json', JSON.stringify(users))
    return {success:true}
}    

function login(email, password){
// go through all the users, find the userID with the email....



if(users[userID].email===email ){
    let sessionID = Math.floor(Math.random() * 10000000);
    sessionInfo[sessionID] = email;

}    

}

module.exports = {
    signUp,
    login
}
