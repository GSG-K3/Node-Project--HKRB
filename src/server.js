const express = require('express');
const request = require('request');
const app = express();


app.get('/', (req, res) => {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=""';
    request(url, (error, response) => {
        response = JSON.parse(response.body);
        res.send(response);

    });


});

// search of input values(Book name)from dom.
app.get('/search/:name', (req, res) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.name}`
    request(url, (error, response) => {
        response = JSON.parse(response.body);
        res.send(response);

    });
});

// check the foundation of pages
app.use((req, res) => {
    res.status(404).send("Page not found 404");
});

// check server errors 
app.use((error, req, res, next) => {
    res.status(500).send("internal server error");
    next();
});



app.listen(3000, () => {
    console.log('This server is running');
});