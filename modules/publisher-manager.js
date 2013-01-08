/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');
var AM = require('../modules/account-manager.js');

var PM = {};

module.exports = PM;

PM.addWebsite = function(u,newData,callback) { // Publisher username, new websites data in json and callback
		console.log(newData);
		var w = new WebsiteModel({
			"name":newData.name,
			"category":newData.category,
			"description":newData.description,
			"url":newData.url,
			"created":Date.now()
		});
		w.save(function(e,o){
			if(!e) {
				PublisherModel.findOneAndUpdate(
				  { username:u },
				  { $push: { websites: o }},
				  { safe: true, upsert: true },
				  function(e, o) {
				    if(e) {
				    	callback(e);
				    } else {
				    	callback(null,o);
				    }
				});	
			} else {
				callback(e);
			}
		});


			//http://stackoverflow.com/questions/13412579/node-express-mongoose-sub-collection-document-insert?rq=1
}

PM.getWebsites = function(u,nb,sort,callback) { // Publisher username, number of websites to display, sort criteria and callback
	PublisherModel.findOne({username:u}, function(e,o) {
		if(o) {
			console.log(o.websites);
			callback(null,o.websites);
		} else {
			callback(e);
		}
	})
}
// TO DO

PM.updateWebsite = function(u, w, newData, callback) { // Publisher username, website ID, callback // TO DO
	var user;
	PublisherModel.findOne({username:u}, function(e,o) {
		if(o) {
			user = o;
			WebsiteModel.findOne({_id:w._id}, function(e,o) {
				if(!e) {
					w = o;
				} else {
					callback(e);
				}
			});
		} else {
			callback(e);
		}
	})
}
// TO DO


PM.getWebsite = function(webSite, callback) { // Publisher username, website ID, callback // TO DO
	WebsiteModel.findOne({url:webSite}, function(e,o) {
		if(o) {
			callback(null,o);
		} else {
			callback(e);
		}
	});
}

/**Autre version
PM.getWebsite = function(webSite, callback) {
	PublisherModel.findOne({url : webSite}, function(e,o){
		if(o) {
			callback(null,o);
		} else {
			callback(e);
		}
	});
}**/


PM.deleteWebsite = function(u,w,callback) { // to do ; w._id ???
	PublisherModel.findOne({username:u}, function(e,o) {
		if(o) {

		} else {
			callback(e);
		}
	});
}

PM.autoLogin = AM.autoLoginPublisher;

PM.login = AM.loginPublisher;