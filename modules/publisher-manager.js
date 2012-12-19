/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');
var AM = require('../modules/account-manager.js');

var PM = {};

module.exports = PM;

PM.addWebsite = function(u,newData,callback) {
		var w = new WebsiteModel({
			"name":newData.sitename,
			"category":newData.sitecategory,
			"description":newData.sitedescription,
			"url":newData.siteurl,
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

PM.getWebsites = function(u,nb,sort,callback) {
	PublisherModel.findOne({username:u}, function(e,o) {
		if(!e) {
			console.log(o.websites);
			callback(null,o.websites);
		} else {
			callback(e);
		}
	})
}

PM.autoLogin = AM.autoLoginPublisher;

PM.login = AM.loginPublisher;