
/**
 * Module dependencies 
 */

var express = require('express')
  , i18n = require("i18n")
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

mongoose.connect('mongodb://localhost/adversify_database'); // TO DO : connection pooling

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

require('./router')(app); // Router file.

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
    name: { type: String, required: true }, 
    url : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/, required: true, unique: true },
    description : { type : String },
    category : { type : String }, 
    validated : { type : Boolean, default: false },
    modified: { type: Date, default: Date.now },
    created: {type: Date}
});

var Ad = new Schema({
    name: {type: String},
    remuneration: [{ cp: {type: String ,enum: ['cpm', 'cpc']}, repartition: [{ cpm: {type:Number}, cpc: {type:Number}}] }],
    kind: { type : String, enum: ['image','text'] }, 
    modified: {type: Date},
    created: {type: Date},
    validated : { type : Boolean },
    colors : [{textColor: {type : String, default: "#333"}, borderColor: {type: String, default: "#000"}, bgColor: {type:String, default: "#fff"}, titleColor: {type:String, default:"#2672ec"}}] 
});

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
WebsiteModel = mongoose.model('websites', Website);
AdModel = mongoose.model('ads', Ad);


/* TESTs*/


  // Server up and running
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});