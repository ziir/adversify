var mongoose = require('mongoose');
var DV = {}; // Delivery Module, requests from the client on the publisher website.
module.exports = DV;


DV.generateClientSideJS = function(publisherId,websiteId,randomString,callback) {
  var script;

  PublisherModel.findOne({_id:publisherId, "websites._id":websiteId}, function(e,o) {
    if(o) {
      callback(null,"Console.log: Site reconnu");
    } else if(e) {
      callback(e);
    } else {
      callback("Unexpected error occured");
    }
  });
}
