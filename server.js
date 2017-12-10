var express       = require('express');
var app           = express();

var bodyParser    = require('body-parser');
//var multer        = require('multer');
var uuid          = require('uuid');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require("mongoose");

//connect to database
var db = mongoose.connect(process.env.MONGODB_URI);

app.use(express.static(__dirname + '/public/client'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.PASSPORT_SECRET
}));

app.use(cookieParser());

app.use(passport.initialize());

app.use(passport.session());

require("./public/server/app.js")(app, uuid, db, mongoose);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
