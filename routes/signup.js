var mongoose = require('mongoose');
var pwd = require('pwd');
var AM = require('../modules/account-manager.js');


exports.create = function(req,res){
 AM.signup(req.body,console.log);

}

/*
 * Signup (old)


exports.create = function(req, res){
    var userjson = req.body;
    var user;


    if(userjson.kind === 0 || userjson.kind === 1){
      pwd.hash(userjson.password, function(err, salt, hash){
        if(userjson.kind === 0){
          user = new AdvertiserModel({
            username: userjson.username,
            email: userjson.email,
            password: hash,
            salt: salt
          },PublisherModel.findOne({'username' : userjson.username},function (e, o) {
            if (e) { throw e; }
            if(!o) { 
              user.save(function (e) {
                if (!e) {
                  return console.log("Successfuly created advertiser account");
                  res.send(200);
                } else {
                  return console.log(e);
                  res.send(500, { error: 'Something blew up! (Database related)' });
                }
              });
            }
            else
            {
              console.log('username already in use!');
              res.send(500, { error: 'username already in use!' });
            }
          }));
        }
        if(userjson.kind === 1){
          query = AdvertiserModel.find(null);
          query.where('username',userjson.username);
          query.exec(function (err, advertisers) {
            if (err) { throw err; }
            if(advertisers.length === 0) {
              user.save(function (err) {
                if (!err) {
                  return console.log("Successfuly created USER");
                  res.send(200);
                } else {
                  return console.log(err);
                  res.send(500, { error: 'Something blew up!' });
                }
              });
            }
            else
            {
              console.log('username already in use!');
              res.send(500, { error: 'Something blew up!' });
            }
          });
          user = new PublisherModel({
            username: userjson.username,
            email: userjson.email,
            password: hash,
            salt: salt
          });
          console.log("Creating Publisher");
        }
    });
  }
  //mongoose.connection.close(); // TO DO : make this work
  //res.end(); / TO DO : make this work
};


*/


exports.updateSignup = function(req,res){
  var user;

}

exports.validateEmail = function(req,res){
  var user;

}

