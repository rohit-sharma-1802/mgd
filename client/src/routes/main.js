const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const routes = express();
const bodyParser = require('body-parser');
const db = require('../routes/db_connection');
routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(express.static('public'));

routes.use((req, res, next) => {
    res.set('Cache-control', 'no-cache,private,must-revalidate,no-store');
    next();
})
routes.use(session({
    secret: 'your secret key',
    resave: true,
    saveUninitialized: true
}));


//index page route
routes.get("/", async(req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

routes.get("/about-us", (req, res) => {
    try {
        res.render('about-us');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

routes.get('/blog', (req, res) => {
    try {
        res.render('blog');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

routes.get('/blog/:id', (req, res) => {
    try {
        res.render('blog');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


routes.get("/garden-listing", (req, res) => {
    try {
        res.render('garden-listing');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

routes.get("/garden-listing/:id", (req, res) => {
    try {
        res.render('garden-listing-single');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




//login and signup routes
routes.get('/signup', (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.error(error);
        res.status(500).send('internal server error')
    }
});

routes.post('/signup', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    const sql = `insert into user(name, email, password) values('${name}', '${email}', '${password}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('user successfully registered');
    })
});

routes.get('/signin', (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.error(error);
        res.status(500).send('internal server error')
    }
});

routes.post('/signin', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    const sql = `select * from user where email = '${email}' and password = '${password}'`;
    db.query(sql, (err, results) => {
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.email = email;
            res.redirect('dashboard');
        } else {
            res.send('invalid username or password');
        }
    });
})

routes.get('/dashboard', (req, res) => {
    if (req.session.loggedin)
        res.render('dashboard');
    else {
        res.redirect('/signin');
    }
});

routes.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
            console.log(err);
        else {
            res.redirect('/');
        }
    })

})

module.exports = routes;