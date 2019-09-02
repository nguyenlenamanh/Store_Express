var express = require('express');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser('Kj8kDFWoTME33uAFcUkHPh0q20OAZUHeN9U824MN'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

var categories = require('./routes/categories.route'); 
var products = require('./routes/products.route');
var users = require('./routes/users.route');
var auth = require('./routes/auths.route');
var authMiddleware = require('./middleware/auths.middleware');
var sessionMiddleware = require('./middleware/sessions.middleware');

app.use(sessionMiddleware);
app.use('/categories',categories);
app.use('/products',products);
app.use('/users',authMiddleware.requiredAuth, users);
app.use('/auth',auth);

app.listen(3000);