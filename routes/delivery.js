var DV = require('../modules/delivery.js');
exports.createHash = function(req, res){
	DV.GenerateHashFromRandom(req.params.r, function(o) {
		res.send(o,200);
	});
}

exports.test = function(req,res) {
	res.send(200); 

}

