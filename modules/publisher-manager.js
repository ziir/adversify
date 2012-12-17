/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');

var PM = {};

module.exports = PM;

PM.addWebsite = function(user,newData,callback) {
		var website = {
			"name":newData.sitename,
			"category":newData.sitecategory,
			"description":newData.sitedescription,
			"url":newData.siteurl
		};
		var publisher; 
		PublisherModel.findOne({username:user.username}, function(e,o) {
			console.log(o);
			o.update({websites:[website]},function(e) { console.log(e); });
			callback(null,o);
		});
}