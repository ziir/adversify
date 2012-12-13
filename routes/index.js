
/*
 * GET home page.
 */

exports.index = function(req, res){
	if(req.session.user) {
		if(req.session.kind == "publisher") {
			res.redirect("/publisher/default");
		} else if(req.session.kind == "advertiser") {
			res.redirect("/advertiser/default");
		}
	}	
  res.render('index.html', { title: 'Adversify - Sign Up' });
};

exports.pagenotfound = function(req,res){
	res.render('404.html', { title: 'Page not found!'});
}

exports.logout = function(req, res){
	req.session.destroy();
	res.redirect("/");
}
