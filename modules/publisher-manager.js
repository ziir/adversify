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

PM.addZone = function(u,newData,callback) {
		console.log(newData);
		var z = new ZoneModel({
			"name":newData.name,
			"created":Date.now()
		});

		// WORKAROUND for positional cursor + $push, see https://jira.mongodb.org/browse/SERVER-831

		z.save(function(e,o){
			console.log("zone saved into zone collection");
			if(!e) {
				PublisherModel.findOne(
				  { username:u, "websites.url":newData.url },
				  function(e,o) {
				    if(e) {
				    	callback(e);
				    	console.log("Error due to save");
				    } else {
				    	console.log('Match for this website and user, getting the copy of the website to push');
				    	WebsiteModel.findOneAndUpdate(
				    		{ url:newData.url },
				    		{ $push : { zones : z }},
				    		{ safe: true, upsert:true },
				    		function(e,o) {
				    			if(e) {
				    				callback(e);
				    			} else {
				    				callback(null,o);
				    			}
				    	});
				    }
				});	
			} else {
				callback(e);
			}
			
		});

	
}

PM.getWebsites = function(u,nb,sort,callback) { // Publisher username, number of websites to display, sort criteria and callback
	var urls = [];
	var tempW;
	var w;
	PublisherModel.findOne({username:u}, function(e,o) {
		if(o) {
			//console.log(o.websites);
			tempW = o.websites;
			for(var i=0;i < tempW.length; i++) {
				urls.push(tempW[i].url);
				console.log("JE TENTE LE PUSH"+tempW[i].url);
			}
			console.log(urls);
			WebsiteModel.find({url:{$in: urls}}, function(e,o) {
				if(e) {
					callback(e);
				} else {
					console.log(o);
					callback(null,o);
				}
			});

		} else {
			callback(e);
		}
	});
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


PM.deleteWebsite = function(u,nId,callback) { // to do ; w._id ???
	PublisherModel.findOneAndUpdate(
		{username:u, "websites.niceId":nId},
		{ $pull: {  "websites.niceId": nId }},
		{ safe: true, upsert: true },
		 function(e,o) {
		if(o) {
			callback(null,o);
		} else {
			callback(e);
		}
	});
}

PM.updateAccount = AM.updatePublisher;

PM.autoLogin = AM.autoLoginPublisher;

PM.login = AM.loginPublisher;

PM.get = AM.getPublisher;

PM.getProfile = AM.getPublisherProfile;

PM.setPassword = PM.setPassword;
