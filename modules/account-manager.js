/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');
var pwd = require('pwd');

var AM = {};

module.exports = AM;

AM.loginAdvertiser = function(username, password, callback) {
	var user;
	console.log("----- Login -----");
	console.log(username+" [-] "+password);

		AdvertiserModel.findOne({username:username}, function(e, o) {
		if (o == null){
			callback('user-not-found');
		}	else{
			user = o;
			pwd.hash(password, user.salt, function(err, hash){
  				if (user.password == hash) {
  					callback(null,o);
    				console.log("User Successfully logged in to Advertiser account ("+username+")");
  				} else {
  					callback('invalid-password');
  				}
			});
		}
	});
}


AM.autoLoginAdvertiser = function(username, password, callback)
{
	AdvertiserModel.findOne({username:username}, function(e, o) {
		if (o){
			o.password == password ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}


AM.autoLoginPublisher = function(username, password, callback)
{
	PublisherModel.findOne({username:username}, function(e, o) {
		if (o){
			o.password == password ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}



AM.loginPublisher = function(username, password, callback) {
	var user;
	console.log("----- Login -----");
	console.log(username+" [-] "+password);

		PublisherModel.findOne({username:username}, function(e, o) {
		if (o == null){
			callback('user-not-found');
		}	else{
			user = o;
			pwd.hash(password, user.salt, function(err, hash){
  				if (user.password == hash) {
  					callback(null,o);
    				console.log("User Successfully logged in to Publisher account ("+username+")");
  				} else {
  					callback('invalid-password');
  				}
			});
		}
	});
}



AM.signupStep2 = function(newData, callback) {
	var user;
	// TO DO
}



AM.signup = function(newData, callback) {
	var user;
	// TO DO : Make a better query please!
	AdvertiserModel.findOne({username:newData.username}, function(e, o) {
		if (o){
			callback('username-taken');
		}	else{
				PublisherModel.findOne({username:newData.username}, function(e,o) {
					if (o){
						callback('username-taken'); // Username taken by publisher
					}	else{
							AdvertiserModel.findOne({email:newData.email}, function(e, o) {
								if (o){
									callback('email-taken'); // Username taken by advertiser
								}	else{
										PublisherModel.findOne({email:newData.email}, function(e, o) {
											if (o) {
												callback('email-taken'); // Email taken by publisher
											} 	else {
													pwd.hash(newData.password, function(e,salt,hash){
														if(newData.kind == 0) {
															user = new AdvertiserModel({
												            username: newData.username,
												            email: newData.email,
												        	password: hash,
												            salt: salt,
												        	joined: Date.now()});
												        user.save(function(e,o) {
												        	if(!e) {
																console.log("Successfully saved new Advertiser "+newData.username+" - "+newData.email);
													            callback(null,o);
												        	} else {
												        		callback(e);
												        	}
												        });
												        } 						
														else if(newData.kind == 1){
															user = new PublisherModel({
												            username: newData.username,
													        email: newData.email,
													        password: hash,
													        salt: salt,
													        joined: Date.now()});
													    user.save(function(e,o) {
													        if(!e) {
																console.log("Successfully saved new Publisher "+newData.username+" - "+newData.email);
														        callback(null,o);
													        } else {
													        	callback(e);
													        }
													    });
													    }
													    else {callback('Not user kind specified');}
													});
												 }
										});
												}
										});
									}
							});
						}
				});

}


AM.setPassword = function(email, newPass, callback)
{
	AdvertiserModel.findOne({email:email}, function(e, o){
		if(o) {
			pwd.hash(newPass, function(e,salt,hash){
				o.pass = hash;
				o.salt = salt;
				AdvertiserModel.save(o); callback(o);
			});
		}
		else {
			PublisherModel.findOne({email:email}, function(e,o){
				if(o) {
					pwd.hash(newPass, function(e,salt,hash){
						o.pass = hash;
						o.salt = salt;
						PublisherModel.save(o); callback(o);
					});
				}
			})
		}
	});
}

AM.validateLink = function(email, passHash, callback)
{
	AdvertiserModel.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		if(!o) {
			PublisherModel.find({ $and: [{email:email, pass:passHash}] }, function(e,o) {
				callback(o ? 'ok' : null)
			});
		}
	});
}