var DV = require('../modules/delivery.js');
exports.createHash = function(req, res){
	DV.GenerateHashFromRandom(req.params.r, function(o) {
		res.send(o,200);
	});
}

exports.test = function(req,res) {
	res.send(200); 
}

exports.generateJS = function(req,res) {
	var accountId = req.params.account;
	var websiteId = req.params.website;

}

