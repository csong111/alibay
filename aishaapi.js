
app.post('/login', (req, res) => {
    let body = JSON.parse(req.body.toString());
    let email = body.email
    let password = body.password
    res.send(JSON.stringify(alibay.login(email, password)));
});