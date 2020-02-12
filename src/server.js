const express = require('express');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

let inputs;
app.use((req, res, next) => {
    console.log("999999999999999999999999999999999999999999999999")
    console.log(req, "6666")
    if (req.path.includes("search")) {
        inputs = req.path.split("=")[1]
        console.log(inputs, "3333")
        const url = `https://www.googleapis.com/books/v1/volumes?q=${inputs}`;
        request.get(url, (error, response, body) => {
            response = JSON.parse(response.body);
            // console.log(res2, '0000')
            res.send(response)
                // res.sendFile(path.join(__dirname, '..', 'public', 'booklist.html'));
                //res.send(response);

        });
    } else {
        console.log(req.path, "5555")
        next()
    }
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/', (req, res) => {

    // console.log("www", req.body)
    inputs = req.body
    console.log(req.route.path, "3333")
    const url = `https://www.googleapis.com/books/v1/volumes?q=${inputs}`;
    request.get(url, (error, response, body) => {
        response = JSON.parse(response.body);
        // console.log(res2, '0000')
        res.send(response)
            // res.sendFile(path.join(__dirname, '..', 'public', 'booklist.html'));
            //res.send(response);

    });
    //request.pipe(request.put(`https://www.googleapis.com/books/v1/volumes?q=${inputs}`))
    // request.get(url)
    //     .on('response', function(response) {
    //         console.log("000000", response.statusCode) // 200
    //         console.log(response.headers['content-type']) // 'image/png'
    //     })
    // res.redirect(`/${inputs}`);

});

// search of input values(Book name)from dom.
// app.get('/:name', (req, res) => {
//     res.send("hello")
//         // res.sendFile(path.join(__dirname, '..', 'public', 'booklist.html'));
// });


// app.post('/:name', (req, res) => {

//     console.log(req.body)
//     inputs = req.body

//     const url = `https://www.googleapis.com/books/v1/volumes?q=${inputs}`;
//     request(url, (error, response, body) => {
//         response = JSON.parse(response.body);
//         res.send(response);
//         //  res.redirect(`/${inputs}`);

//     });
// });
app.use((req, res) => {
    res.status(404).send('Page not found 404');
})

// check server errors
app.use((error, req, res, next) => {
    res.status(500).send('internal server error');
    next();
});

app.listen(3000, () => {
    console.log('This server is running');
})