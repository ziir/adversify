var mongoose = require('mongoose');
/*
 * Signup
 */

exports.create = function(req, res){
	
 	console.log("POST lol: ");
  	console.log(req.body);
  	var user = new UserModel({
	    username: req.body.username,
	    email: req.body.email,
	    password: req.body.password,
	    password_again: req.body.password_again 
  });
  user.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(user);
	
};
