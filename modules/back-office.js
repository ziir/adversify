/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');

// use moment.js for pretty date-stamping //
var moment = require('moment');

var BOM = {}; // BACK OFFICE Manager

module.exports = BOM;

BOM.validateWebsite = function(url,callback) {
	console.log(url);
	PublisherModel.findOne({url:url}, function (e,o){
		if(o) {
			// VALIDER LE SITE

			// Envoyer un mail pour prévenir le Publisher
		} else {
			callback("site-not-found");
		}
	}) // Le site existe deja, verif sur url
}

BOM.unValidateWebsite = function(url,callback) {
	console.log(url);
	PublisherModel.findOne({url:url}), function(e,o){
		if(o) {
			// ENVOYER UN MAIL POUR PREVENIR LE PUBLISHER
		} else {
			callback("site-not-found");
		}
	}
}


BOM.validateAd = function(ad,callback) {
	console.log(advertiser);
	AdvertiserModel.findOne({ad:ad}), function(e,o){
		if(o) {
			// Valider l'annonce
		}else {
			callback("ad-not-found");
		}
	}
}

BOM.unValidateAd = function(ad,callback) {
	console.log(advertiser);
	AdvertiserModel.findOne({ad:ad}), function(e,o){
		if(o) {
			// Valider l'annonce
		}else {
			callback("ad-not-found");
		}
	}
}

BOM.