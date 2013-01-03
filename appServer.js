
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

require('./schemas/Advertisers.js');
require('./schemas/Publishers.js');


/* TESTs*/


  // Server up and running
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
