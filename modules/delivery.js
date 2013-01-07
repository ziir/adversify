var Hashids = require("hashids");
var DV = {}; // Delivery Module, requests from publisher website
/*var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/delivery", function(err, db) {
  if(err) { return console.dir(err); }
 });*/
module.exports = DV;


DV.GenerateHashFromRandom = function(r,callback) {
	console.log(r);
   hashids = new Hashids("this is my salt");

var hash = hashids.encrypt(r);
callback(hash);

//INSERT DANS BDD HASH VALIDE DEUX HEURES
// CALLBACK 
// RENVOI VALEUR AU CLIENT SANS MONGOOSE POPOPOP


// Connect to the db
/*

  var collection = db.collection('test');
  var doc1 = {'hello':'doc1'};
  var doc2 = {'hello':'doc2'};
  var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

  collection.insert(doc1);

  collection.insert(doc2, {w:1}, function(err, result) {});

  collection.insert(lotsOfDocs, {w:1}, function(err, result) {});
*/
}
