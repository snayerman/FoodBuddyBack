var express = require('express');
var bodyParser = require('body-parser');

var expressValidator = require('express-validator');
var validator = require('validator');

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
   // res.header("Access-Control-Allow-Origin", "http://localhost:5000");
   // var allowedOrigins = ['http://localhost:5000', 'https://murmuring-dusk-37367.herokuapp.com'];
   // var origin = req.headers.origin;
   
   // if(allowedOrigins.indexOf(origin) > -1){
   //       res.setHeader('Access-Control-Allow-Origin', origin);
   // }
   res.header("Access-Control-Allow-Origin", "https://murmuring-dusk-37367.herokuapp.com");
   res.header("Access-Control-Allow-Credentials", true);
   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
   res.header("Content-Type", "application/json");
   res.header("Access-Control-Expose-Headers", "Location");
   next();
})

// parse application/json
app.use(bodyParser.json())

// use validator
app.use(expressValidator());

// Configuring the database
// var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://ds143039.mlab.com:43039/foodbuddy', {
   user: 'sam',
   pass: 'password'
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to FoodBuddy's Awesome Backend Server!!!!!"});
});

// require('./app/routes/note.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/recipe.routes.js')(app);
// require('./app/routes/post.routes.js')(app);

// listen for requests
var port = process.env.PORT || 3001;
app.listen(port, function(){
    console.log("Server is listening on port "+port);
});