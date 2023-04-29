const express = require('express');
const routes = require('./routes/main')
const hbs = require('hbs');
const app = express();
const bodyParser = require('body-parser');
//using routes - main.js
app.use('', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
//template engine - using hbs
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', 'views');
hbs.registerPartials('views/partials');


app.listen(process.env.PORT | 3000, () => {
    console.log("client Started");
});