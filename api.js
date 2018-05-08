// const alibay = require('./alibay')
const aisha = require('./aisha')
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
    res.send(JSON.stringify(aisha.login(email, password)));
});

app.post('/signup', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let email = body.email
    let password = body.password
    let firstName = body.firstName
    let lastName = body.lastName
    res.send(JSON.stringify(aisha.signUp(email, password, firstName, lastName)));
});

app.listen(4000, () => console.log('Listening on port 4000!'))
