const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/lwa-store'));

// PathLocationStrategy
app.get('/*', function(req, res) {

    res.sendFile(path.join(__dirname + '/dist/lwa-store/index.html'));

})

app.post('home/checkout-success', (req, res) => {
    paypalRequestHandler.handleRequest(req, res)
        .then(() => {
            res.sendStatus(200);
        }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.listen(PORT);
console.log('Console listening!' + PORT);