
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.404 = function(req,res){
	res.render('404.html', { title: 'Page not found!'});
}
