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


WM.deleteWebsite = function(uId,nId,callback) { // to do ; w._id ???
	console.log("delete website?");

	ZM.deleteZonesByWebsite(uId, nId, function(e,o) {
		console.log("ZM.deleteZonesByWebsite"+o);
		if(e) {
			callback(e);
		} else if(o == "OK"){
			console.log("Zones successfully removed");
			PublisherModel.findOne({_id:uId, "websites._id":nId},
			function(e,o) {
			 	if(e) {
			 		callback(e);
			 	} else if(o){
			 		o.websites.id(nId).remove();
			 		o.save(function (e,o) {
						WebsiteModel.remove({_id:nId}, function(e) {
					 		if(e) {
					 			callback(e);
					 		} else {
					 			callback(null,"OK");
					 			var action = new ActionModel({
					 				name:"add-website",
					 				userId:uId,
					 				itemId: nId
					 			});
					 			action.save();
					 		}
						});
			 		});
			 	} else {
			 		callback("Could not find website for this publisher");
			 	}
			});
		}
	});
}


WM.addWebsite = function(u,newData,callback) { // Publisher username, new websites data in json and callback
		console.log(newData);

		PublisherModel.findOne({username:u,"websites.url":newData.url}, function(e,o) {
			if(o && !e) {
				console.log("Website ok");
				WebsiteModel.findOne({"url":newData.url}, function(e,o) {
					if(o) {
						o.zones = newData.zones;
						o.save(function(e,o) {
							if(o) {
								callback(null,"OK");
							} else if(e){
								callback(e);
							} else allback("Unexpected event occured");
						});
					} else if(e) {
						callback(e)
					} else callback("Unexpected event occured");
				});
			}
			else if(!o && !e) {
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
				  { $push: { websites: 
				  	{
						"name":newData.name,
						"category":newData.category,
						"description":newData.description,
						"url":newData.url,
						"created":Date.now(),
						"_id":o._id				  	
				  	} 
				}},
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
			} else if(e){
				callback(e);
			} else {
				callback("Something weird happenned");
			}
		})
		


			//http://stackoverflow.com/questions/13412579/node-express-mongoose-sub-collection-document-insert?rq=1
}