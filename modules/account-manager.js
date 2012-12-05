/* This module is so not ready for production!*/

var mongoose = require('mongoose');
var pwd = require('pwd');

// use moment.js for pretty date-stamping //
var moment = require('moment');

var AM = {};

module.exports = AM;

AM.signup = function(newData, callback)
{
	console.log("------ Trying signup -------");

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
														if(newData.kind === 0) {
															user = new AdvertiserModel({
												            username: newData.username,
												            email: newData.email,
												        	password: hash,
												            salt: salt,
												            joined,updated : moment().format('MMMM Do YYYY, h:mm:ss a'),
												            /*updated : moment().format('MMMM Do YYYY, h:mm:ss a')*/}, function(e){
												            	if(e) {
												            		    return console.log(e);
                 														res.send(500, { title: 'Adversify - Error',error: 'Something blew up!',body: '<h1>ERROR</h1>' });
												            	}	else {
												            			return console.log("Successfully saved new Publisher "+newData.username+" - "+newData.email)
												            	}
												            });
														}
														if(newData.kind === 1)
														{
															echo 
												        },function(o,e){

												        });
													});
												}
										});
									}
							});
						}
				});
			}
	});
