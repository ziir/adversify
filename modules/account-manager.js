/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');
var pwd = require('pwd');

// use moment.js for pretty date-stamping //
var moment = require('moment');

var AM = {};

module.exports = AM;

AM.loginAdvertiser = function(username, password, callback) {
	var user;
	console.log("----- Login -----");
	console.log(login+" [-] "+password);

		AdvertiserModel.findOne({username:username}, function(e, o) {
		if (o == null){
			PublisherModel.findOne({username:username}, function(e, o) {
				if (o == null){
					callback('user-not-found');
				}
			});
		}	else{
			user = o;
			pass.hash(password, user.salt, function(err, hash){
  				if (user.hash == hash) {
    				console.log("User Successfully logged in to Advertiser account ("+username+")");
    				// to do : session et tout le bordel
  				} else {
  					callback('invalid-password');
  				}
			});
		}
	});
}

AM.loginPublisher = function(username, password, callback) {
	var user;
	console.log("----- Login -----");
	console.log(login+" [-] "+password);

		PublisherModel.findOne({username:username}, function(e, o) {
		if (o == null){
			callback('user-not-found');
		}	else{
			user = o;
			pass.hash(password, user.salt, function(err, hash){
  				if (user.hash == hash) {
    				console.log("User Successfully logged in to Publisher account ("+username+")");
    				// to do : session et tout le bordel
  				} else {
  					callback('invalid-password');
  				}
			});
		}
	});
}



AM.signupStep2 = function(newData, callback) {

console.log("step2");
}

AM.signup = function(newData, callback) {
	console.log(newData)
	console.log("------ Trying signup -------");
	var user;

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
													console.log("izi");
													pwd.hash(newData.password, function(e,salt,hash){
														if(newData.kind === 0) {
															console.log("Advertiser");
														var user = new AdvertiserModel({
												            username: newData.username,
												            email: newData.email,
												        	password: hash,
												            salt: salt,
												            joined : moment().format('MMMM Do YYYY, h:mm:ss a'),
												            updated : moment().format('MMMM Do YYYY, h:mm:ss a')});
												            			user.save(function() {
																			console.log("Successfully saved new Advertiser "+newData.username+" - "+newData.email);
												            				//res.send(200);
												            				//res.end();
												            			});
												            	}
												            
														
														if(newData.kind === 1){
															console.log("Publisher");
															var user = new PublisherModel({
												            	username: newData.username,
													            email: "newData.email",
													        	password: hash,
													            salt: salt,
													            joined: moment().format('MMMM Do YYYY, h:mm:ss a'),
													            updated : moment().format('MMMM Do YYYY, h:mm:ss a')});
													            			user.save(function() {
													            				console.log("Successfully saved new Publisher "+newData.username+" - "+newData.email);
													            				//res.send(200);
													            				//res.end();
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