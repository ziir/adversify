var DV = require('../modules/delivery.js');
exports.createHash = function(req, res){
	DV.GenerateHashFromRandom(req.param(r), function(o) {
		res.send(o,200);
	});
}

exports.test = function(req,res) {
	res.send(200); 
}

exports.generateJS = function(req,res) {
	var accountId = req.params.account;
	var websiteId = req.params.website;
	var randomString = req.params.randomNumber;
	//console.log(req);
	DV.generateClientSideJS(accountId,websiteId,randomString, function(e,o) {
		if(o) {
			console.log("Generating client script - PublisherId : "+accountId+" - WebsiteId : "+websiteId+" - RandomClientGenerated : "+randomString);
			res.send(o,200);
		} else {
			res.send(e,400);
		}
	});

}

