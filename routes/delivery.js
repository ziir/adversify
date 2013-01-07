var DV = require('../modules/delivery.js');
exports.createHash = function(req, res){
	console.log(req.params.r);
	console.log("plop");
	DV.GenerateHashFromRandom(req.params.r, function(o) {
		console.log(o);
		res.send(o,200);
	});
}

