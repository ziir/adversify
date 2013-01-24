
/**
 * Module dependencies 
 */

var http = require('http')
  , express = require('express')
  , app = express()
  , server = http.createServer(app)
  , i18n = require("i18n")
  , mongoose = require('mongoose')
  , io = require('socket.io').listen(server)
  , path = require('path'),
    crontest = require('./cronjob.js');

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

app.get('/socket', function(req,res){
  console.log("Attempt to connect SOCKET : "+req.session.uid);
  io.of('/'+req.session.uid).on('connection', function (socket) {
    PublisherModel.findOne({_id:req.session.uid}, function(e,o){
      if(o) {
        socket.emit('getValue', o.balance/1000);
        console.log("Connection accepted");
        res.send("OK",200);
      } else {
        console.log("Connection refused");
        res.send(e,400);
      }
    });
  });
});

app.get('/AddRevenue', function(req,res) {
  console.log("Adding 10€ to revenues");
  var valueToAdd = 10;
  var year = { balance: valueToAdd };
  PublisherModel.findOneAndUpdate({username:req.session.username},
      { $push: { twelveMonthsBalance : year } },
      { safe: true, upsert: true },
        function(e,o) {
          if(o) {
            var month = { balance: valueToAdd};
            PublisherModel.findOneAndUpdate({username:req.session.username},
              { $push: { months : month } },
              { safe: true, upsert: true },
              function(e,o) {
                if(o) {
                  res.send(o,200);
                } else if(e){
                  res.send(e,400);          
                } else {
                  res.send("Something unexpected occured");
                }
              });
          } else if (e) {
            console.log(e);
            res.send(e,400);
          }
    });
});


app.get('/plus1000', function(req,res) {
  console.log("+1000");
  PublisherModel.findOneAndUpdate({username:req.session.username},
  {$inc: { balance: 1 }},
  {safe: true},
  function(e,o) {
    if(o) {
      io.of('/'+o._id).emit('getValue', LMao.balance/1000);
        res.send(o);
    }
  });
});



require('./router')(app); // Router file.

// Mongoose schema to model, TO-DO, get it out of this file ?

require('./schemas/Advertisers.js');
require('./schemas/Publishers.js');
require('./schemas/Zones.js');
require('./schemas/Actions.js');
require('./schemas/Websites.js');





/* TESTs*/


  // Server up and running
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
