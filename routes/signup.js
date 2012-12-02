var mongoose = require('mongoose');
var pwd = require('pwd');
/*
 * Signup
 */

exports.create = function(req, res){
    pwd.hash(req.body.password, function(err, salt, hash){
      var user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        salt: salt
      });
      user.save(function (err) {
        if (!err) {
          return console.log("Successfuly created USER");
        } else {
          return console.log(err);
        }
      })
      return res.send(user);
  });

  
  
};
