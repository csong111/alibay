// const alibay = require('./alibay')
const alibay = require('./alibay')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: "*/*" }))


app.get('/itemsBought', (req, res) => {
    let uid = req.query.uid;
    res.send(JSON.stringify(alibay.getItemsBought(uid)));
});


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
    res.send(JSON.stringify({success:true}))
    console.log("success!")
    }
});

app.post('/signup', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let email = body.email
    let password = body.password
    let firstName = body.firstName
    let lastName = body.lastName
    res.send(JSON.stringify(alibay.signUp(email, password, firstName, lastName)));
});

app.listen(4000, () => console.log('Listening on port 4000!'))
