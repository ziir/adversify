/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');
var ZM = {};

module.exports = ZM;
var WM = require('../modules/website-manager.js');


ZM.addZone = function(u,newData,callback) {
		console.log(newData);
		var z = new ZoneModel({
			"name":newData.name,
			"created":Date.now(),
			"dimensions":newData.dimensions,
			"format":newData.format,
			"remuneration":newData.remuneration,
			"kind":newData.kind
		});

		// WORKAROUND for positional cursor + $push, see https://jira.mongodb.org/browse/SERVER-831

		z.save(function(e,o){
			if(!e) {
				z = o;
				PublisherModel.findOne(
				  { username:u, "websites.url":newData.url },
				  function(e,o) {
				    if(e) {
				    	callback(e);
				    } else {
				    	console.log("Saving into Website");
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

ZM.deleteZonesByWebsite = function(uId,wId,callback) { // Deletes all zones inside a website
	var ids = []
	, tempZones = [];
	PublisherModel.findOne({_id:uId, "websites._id":wId}, function(e,o) {
		if(o) {
			WebsiteModel.findOne({_id:wId}, function(e,o) {
				tempZones = o.zones;
				o.zones = undefined;
				o.save(function(e) {
					if(e) {
						callback(e);
					} else {
						for(var i=0;i < tempZones.length; i++) {
							ids.push(tempZones[i]._id);
						}
						ZoneModel.find({_id:{$in: ids}}, function(e,o) {
							console.log(o);
							if(e) {
								callback(e);
							} else {
								callback(null,"OK");
							}
						});

					}
				});
			});
		} else {
			callback(e);
		}
	});
}


ZM.deleteZone = function(u,zId,callback) {
	// TO DO : function check user owns this particual zone and website
	WebsiteModel.findOne({"zones._id":nId},
		function(e,o) {
		 	if(e) {
		 		callback(e);
		 	} else {
		 		o.zones.id(nId).remove();
		 		o.save(function (e,o) {
				 		if(e) {
				 			callback(e);
				 		} else {
				 			callback(null,"OK");
				 		}
		 		});
		 	}
	});
}

ZM.getZones = function(uId,callback) { // Having to write so much code for such a simple thing is driving me insane
	var w = [],z = [],zoneIds = [], websiteIds = [];
	PublisherModel.findOne({_id:uId},function(e,o) {
		if(o) {
			w = o.websites;
			for(var i=0;i < w.length; i++) {
				websiteIds.push(w[i]._id);
			}
			console.log(websiteIds);
				WebsiteModel.find({_id:{$in: websiteIds}}, function(e,o) {
					if(e) {	
						callback(e);
					} else if(o) {
						for(var y=0;y < o.length; y++) { // BHOUUU DOUBLE BOUCLE
							for(var x=0; x < o[y].zones.length; x++) {
								zoneIds.push(o[y].zones._id);
							}
						}
						ZoneModel.find({_id:{$in:zoneIds}}, function(e,o) {
							if(e) {
								callback(e);
							} else if(o) {
								callback(null,o);
							} else {
								callback("no-zones-found-"+zoneIds);
							}
						});
					} else {
						callback("no-websites-found-"+websiteIds);
					}
				});
			}
		});
	}