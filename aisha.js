const alibay = require('./alibay')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require("fs")

let users = JSON.parse(fs.readFileSync('./users.json').toString())
// 4145241: {
//     email: "email@email.com",
//     firstName: "Mary",
//     lastName: "doe",
//     password: "password"
// }

let sessionInfo = {}


function genUID() {
    return Math.floor(Math.random() * 100000000)
}

function signUp(email, password, firstName, lastName) {
    let userID = genUID()
    let currentUsers = [];

    Object.keys(users).forEach((user, ind) => {
        if (users[user].email === email) {
            currentUsers.push(users[user])
        }
    })

    if (currentUsers.length >= 1) {
        return { success: false }
    } else {
        users[userID] = { email, password, firstName, lastName }
        fs.writeFileSync('./users.json', JSON.stringify(users))
        return { success: true }
    }
}

function login(email, password) {
    let currentUserName=""
    let currentPassword=""
    Object.keys(users).forEach((user, ind) => {
        if (users[user].email === email){
            currentUserName= users[user].email
            currentPassword= users[user].password
        }
    })
        if (currentUserName === email && currentPassword === password) {
            let sessionID = Math.floor(Math.random() * 10000000);
         //   sessionInfo[sessionID] = email
            return { sessionID }
        } else {
            return { success: false }
        }
}

module.exports = {
    signUp,
    login
}
