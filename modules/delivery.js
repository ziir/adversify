var HashIds = require("hashids");
var DV = {}; // Delivery Module, requests from the client on the publisher website.
module.exports = DV;

DV.generateHashFromRandom = function(r,callback) {

  var hashids = new HashIds("SecretSalt");

  var hash = hashids.encrypt(r);
  callback(hash);
}


DV.generateClientSideJS = function(publisherId,websiteId,randomNumber,callback) {
  var script;
  var hash;

  PublisherModel.findOne({_id:publisherId, "websites._id":websiteId}, function(e,o) {
    if(o) {
      DV.generateHashFromRandom(randomNumber, function(o) {
        if(o) {
          hash = o;
          // CONSTRUIRE UN JAVASCRIPT qui VA CHERCHER LES VALISES 

          // Accepter une requête d'image d 1px*1px pour une période de temps restreinte,
          // confirmant une impression.
          script = "<script>(function(){"+
            "var h = "+hash+"; console.log(h);"+
          "}"+
          "</script>"; 
          callback(null,script);
        } else if(e) {
          callback(e);
        } else {
          callback("Unexpected behavior occured");
        }
      });
    } else if(e) {
      callback(e);
    } else {
      callback("U");
    }
  });
}

DV.logImpression = function(publisherId,zoneId,pUrl,callback) {
  var impression = new ImpressionModel({
    pageUrl:pUrl,
    zoneId:zoneId });
    impression.save(function(e,o) {
        callback(null,"OK");
    });
}

/*
DV.logRevenue = function(zoneId,)  {

}*/