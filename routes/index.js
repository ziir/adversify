
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html', { title: 'Step 1' });
};

exports.pagenotfound = function(req,res){
	res.render('404.html', { title: 'Page not found!'});
}
