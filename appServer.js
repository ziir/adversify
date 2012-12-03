
/**
 * Module dependencies.
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
  app.use(express.favicon()); // Middleware favicon, to-do : use this ?
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('adversify4ever'));
  app.use(express.session());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); // Shown all errors, with stackTrace please
});

// Mongoose schema to model, TO-DO, get it out of this file ?

var Schema = mongoose.Schema;  
 // Maybe there is something better to do than repeating the schema ?
var Publisher = new Schema({
    username: { type: String, required: true, match: /^[a-zA-Z0-9-_]+$/, unique: true },  
    password: { type: String, required: true},
    salt: { type: String, required: true},
    email: { type: String, unique: true, match : /[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}/ },
    modified: { type: Date, default: Date.now }
});

var Advertiser = new Schema({
    username: { type: String, required: true, match: /^[a-zA-Z0-9-_]+$/, unique: true },  
    password: { type: String, required: true},
    salt: { type: String, required: true},
    email: { type: String, unique: true, match : /[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}/ },
    modified: { type: Date, default: Date.now }
});

PublisherModel = mongoose.model('publishers', Publisher);
AdvertiserModel = mongoose.model('advertisers', Advertiser);

  // Handlers , TO-DO, get it out of this file ?


app.get('/', routes.index);

app.post('/signup', signup.create);
app.get('/signup/step2', signup.publisher); // Signup step2
app.post('/signup/step2', signup.step2);

app.get('/publisher', publisher.index);
app.get('/publisher/ads', publisher.ads.list); // List ads
app.post('/publisher/ads', publisher.ads.create); // Create ad
app.put('/publisher/ads', publisher.ads.update); // Update COLLECTION of ads
app.get('/publisher/statistics',publisher.statistics.index);
app.get('/publisher/account',publisher.account.index);
app.get('/publisher/payments,publisher.payments.index');
app.get('/publisher/sites',publisher.sites.list);

app.get('/advertiser', advertiser.index);
app.get('/advertiser/ads', advertiser.ads);
app.get('/advertiser/account', advertiser.account);
app.get('/advertiser/statistics', advertiser.statistics);


  // Server up and running
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});