var express = require('express');
var app = express();
var cors = require('cors');
var session = require('express-session');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var buyer = require('./routes/buyer');
var owner = require('./routes/owner');
var restaurant = require('./routes/restaurant');
var upload = require('./routes/upload');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3100', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_react_node_mysql',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));
app.use(cookieParser());
//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3100');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(bodyParser.json());

app.use('/buyer', buyer);
app.use('/owner', owner);
app.use('/upload', upload);
app.use('/restaurant', restaurant);

//start your server on port 3101
app.listen(3101);
console.log("Server Listening on port 3101.");

module.exports = app;