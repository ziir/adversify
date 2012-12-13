/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');

// use moment.js for pretty date-stamping //
var moment = require('moment');

var PM = {};

module.exports = PM;

PM.addWebsite = function(newData,callback) {
	console.log(newData);
	PublisherModel.findOne({}, function (e,o){
		if(o) {
			callback('site-taken');
		} else {
			// Update 
		}
	}) // Le site existe deja, verif sur url
}