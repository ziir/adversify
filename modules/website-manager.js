/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');
var ZM = require('../modules/zone-manager.js');

var WM = {};

module.exports = WM;


WM.getWebsites = function(u,nb,sort,callback) { // Publisher username, number of websites to display, sort criteria and callback
	var urls = [];
	var tempW;
	PublisherModel.findOne({username:u}, function(e,o) {
		if(o) {
			tempW = o.websites;
			for(var i=0;i < tempW.length; i++) {
				urls.push(tempW[i].url);
			}
			console.log(urls);
			WebsiteModel.find({url:{$in: urls}}, function(e,o) {
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
}
// TO DO

WM.updateWebsite = function(u, w, newData, callback) { // Publisher username, website ID, callback // TO DO
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



WM.getWebsite = function(webSite, callback) { // Publisher username, website ID, callback // TO DO
	WebsiteModel.findOne({url:webSite}, function(e,o) {
		if(o) {
			callback(null,o);
		} else {
			callback(e);
		}
	});
}


WM.deleteWebsite = function(u,nId,callback) { // to do ; w._id ???
	console.log("delete website?");
	PublisherModel.findOne({username:u, "websites._id":nId},
		function(e,o) {
		 	if(e) {
		 		callback(e);
		 	} else {
		 		o.websites.id(nId).remove();
		 		o.save(function (e,o) {
					WebsiteModel.remove({_id:nId}, function(e) {
				 		if(e) {
				 			callback(e);
				 		} else {
				 			ZM.deleteZonesByWebsite(u, nId, function(e,o) {
				 				if(e) {
				 					callback(e);
				 				} else if(o == "OK"){
						 			callback(null,"OK");
				 				}
				 			});
				 		}
					});
		 		});
		 	}
	});
}


WM.addWebsite = function(u,newData,callback) { // Publisher username, new websites data in json and callback
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
				    	console.log(" NO NO NO 222");
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