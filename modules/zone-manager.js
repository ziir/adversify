/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');
  mongoose.set('debug', true);

var ZM = {};

module.exports = ZM;


ZM.addZone = function(u,newData,callback) {
		console.log(newData);
		var z = new ZoneModel({
			"name":newData.name,
			"created":Date.now()
		});

		// WORKAROUND for positional cursor + $push, see https://jira.mongodb.org/browse/SERVER-831

		z.save(function(e,o){
			console.log("zone saved into zones collection");
			if(!e) {
				PublisherModel.findOne(
				  { username:u, "websites.url":newData.url },
				  function(e,o) {
				    if(e) {
				    	callback(e);
				    	console.log("Error with website find");
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

ZM.deleteZonesByWebsite = function(u,wId,callback) { // Deletes all zones inside a website
	var ids = [];
	var tempZones = [];
	PublisherModel.findOne({username:u, "websites._id":wId}, function(e,o) {
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
							console.log("JE TENTE LE PUSH"+tempZones[i]._id);
						}
						console.log(ids);
						ZoneModel.find({_id:{$in: ids}}, function(e,o) {
							if(e) {
								callback(e);
							} else {
								console.log(o);
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
	var zoneIds = [];
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
