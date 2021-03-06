require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();
// at the very top, require express-session
var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var db = require('./models');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

/*
 * setup the session with the following:
 *
 * secret: A string used to "sign" the session ID cookie, which makes it unique
 * from application to application. We'll hide this in the environment
 *
 * resave: Save the session even if it wasn't modified. We'll set this to false
 *
 * saveUninitialized: If a session is new, but hasn't been changed, save it.
 * We'll set this to true.
 */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.use(function(req, res, next) {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
});
// these lines have to occur after the session is configured
var passport = require('./config/ppConfig');
// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', function(req, res) {
//     res.render('nologin');
// });
app.get("/", function(req, res) {
    console.log("Welcome to Treasure Cruiser")
    console.log(req.user)
    console.log(req.session)
    res.render('index', {
        currentUser: req.user,
        session: req.session
    });
});


app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
        currentUser: req.user
    });
});
app.get('/contact', function(req, res) {
    res.render('contact')
});

app.use('/auth', require('./controllers/auth'));
app.use('/search', require('./controllers/search'));
app.use('/collection', require('./controllers/collection'));
app.use('/trade', require('./controllers/trade'));

//heroku will look for the process.env.port and deploy to an open space
var server = app.listen(process.env.PORT || 3000);

module.exports = server;