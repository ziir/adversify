
/**
 * Module dependencies 
 */

var express = require('express')
  , i18n = require("i18n")
  , routes = require('./routes')
  , signup = require('./routes/signup')
  , publisher = require('./routes/publisher')
  , advertiser = require('./routes/advertiser')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

  var app = express();


  // i18n a.k.a Internationalization !
  // TO-DO : better implementation
i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['en', 'fr'],

    // where to register __() and __n() to, might be "global" if you know what you are doing
    register: global

    // To-DO : check this
});

// Database

mongoose.connect('mongodb://localhost/adversify_database');

// App config

app.configure('development', function(){
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('uinexpress').__express);
  app.use(express.cookieParser('adversify4ever'));
  app.use(express.session({ secret : 'adversify-secret'}));
  app.use(express.favicon()); // Middleware favicon, to-do : use this ?
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); // Shown all errors, with stackTrace
});

// Mongoose schema to model, TO-DO, get it out of this file ?

var Schema = mongoose.Schema;

 // Maybe there is something better to do than repeating the schema ?
var Publisher = new Schema({
    username: { type: String, required: true, match: /^[a-zA-Z0-9-_]+$/, unique: true },  
    password: { type: String, required: true},
    salt: { type: String, required: true},
    email: { type: String, unique: true, match : /[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}/, required: true },
    modified: { type: Date, default: Date.now },
    joined: {type: Date},
    streetadress: { type: String },
    city: { type: String },
    country: { type: String },
    websites: [Website]
});

var Website = new Schema({
    name: { type: String }, 
    url : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/ },
    description : { type : String },
    category : { type : String }, // TO DO : add Enum
    validated : { type : Boolean, default: false },
    modified: { type: Date, default: Date.now },
    created: {type: Date},
});

var Ad = new Schema({
    name: {type: String},
    remuneration: {type: String},
    kind: {type: String},
    modified: {type: Date},
    category: {type:String},
    validated : { type : Boolean } 
})

var Advertiser = new Schema({
    username: { type: String, required: true, match: /^[a-zA-Z0-9-_]+$/, unique: true },  
    password: { type: String, required: true},
    salt: { type: String, required: true},
    email: { type: String, unique: true, match : /[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}/,required: true },
    modified: { type: Date, default: Date.now },
    joined: {type: Date},
    streetadress: { type: String },
    city: { type: String },
    country: { type: String },
    ads: [Ad]
});

PublisherModel = mongoose.model('publishers', Publisher);
AdvertiserModel = mongoose.model('advertisers', Advertiser);
AdModel = mongoose.model('ads', Ad);


app.get('/', routes.index);
app.get('/logout', routes.logout);

app.post('/signup', signup.create); 
app.get('/signup/step2', signup.step2); // Signup step2
app.post('/signup/step2', signup.step2create);

app.get('/publisher', publisher.index);
app.post('/publisher/signin', publisher.signin);

app.get('/publisher/default', publisher.default);
app.post('/publisher/websites', publisher.createWebsite);


app.get('/advertiser', publisher.index);
app.post('/advertiser/signin', publisher.signin);

app.get('/advertiser/default', publisher.default);

app.get('/socket', routes.socket);
app.get('/socketview', routes.socketview);

app.get('/test', function(req, res) {
      res.render('test.html', { title : 'Test'});
  });

app.get('*', routes.pagenotfound);

/* TESTs*/


  // Server up and running
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});