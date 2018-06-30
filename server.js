const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set({'view engine': 'hbs'});

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log.');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page Title',
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects Page Title'
    });
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        greeting: 'Welcome to the Website'
    });
});

app.listen(port, () => {
    console.log('Server is up on port',port);
});

// app.get('/bad', (request, response) => {
//     response.send({
//         errorMessage: 'Unable to handle request'
//     });
// });

// app.get('/', (request, response) => {
//     // response.send('<h1>Hello World</h1>');
//     response.send({
//         name: "Bijoyan",
//         Likes: [
//             'travelling',
//             'blogging'
//         ]
//     });
// });
