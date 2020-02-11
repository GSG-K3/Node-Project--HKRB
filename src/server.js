const express = require('express');
const request = require('request');

const app = express();


app.get('/:name', (req, res,body) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.name}`
    request(url, (error, response) => {
        response=JSON.parse(response.body);
        res.send(response);

    });
});

app.listen(3000, () => {
    console.log('This server is running');
});