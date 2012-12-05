/* This module is so not ready for production!*/

var mongoose = require('mongoose');
var pwd = require('pwd');

// use moment.js for pretty date-stamping //
var moment = require('moment');

var AM = {};

module.exports = AM;

AM.signup = function(newData, callback)
{
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
														newData.password = hash;
														newData.salt = salt;
														// BUILD ADVERTISER OR PUBLISHER HERE PLZ													
													// append date stamp when record was created //
														newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
													});
												}
										});
									}
							});
						}
				});
			}
	});
