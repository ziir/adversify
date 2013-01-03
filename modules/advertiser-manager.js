/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');
var AM = require('../modules/account-manager.js');

var AdM = {};

module.exports = AdM;

AdM.addAd = function(u,newData,callback) {
    var a = new AdModel({
      "name":newData.adname,
      "category":newData.adcategory,
      "description":newData.addescription,
      "url":newData.siteurl,
      "created":Date.now()
    });
    a.save(function(e,o){
      if(!e) {
        AdvertiserModel.findOneAndUpdate(
          { username:u },
          { $push: { ads: o }},
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

AdM.getAds = function(u,nb,sort,callback) {
  AdvertiserModel.findOne({username:u}, function(e,o) {
    if(!e) {
      callback(null,o.ads);
    } else {
      callback(e);
    }
  })
}

AdM.addAd = function(u,newData,callback) {
      console.log(newData);
    var a = new AdModel({
      "name":newData.name,
      "category":newData.category,
      "description":newData.description,
      "url":newData.url,
      "created":Date.now()
    });
    a.save(function(e,o){
      if(!e) {
        AdvertiserModel.findOneAndUpdate(
          { username:u },
          { $push: { ads: o }},
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


}

AdM.updateAccount = AM.updateAdvertiser;

AdM.autoLogin = AM.autoLoginAdvertiser;

AdM.login = AM.loginAdvertiser;