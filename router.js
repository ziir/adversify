  var routes = require('./routes')
  , signup = require('./routes/signup')
  , publisher = require('./routes/publisher')
  , advertiser = require('./routes/advertiser');

module.exports = function(app) {

	app.get('/', routes.index);
	app.get('/logout', routes.logout);

	app.post('/signup', signup.create); 
	app.get('/signup/step2', signup.step2); // Signup step2
	app.post('/signup/step2', signup.step2create);

	app.get('/publisher', publisher.index);
	app.post('/publisher/signin', publisher.signin);

	app.get('/publisher/default', publisher.default);
	app.get('/publisher/websites', publisher.getWebsites);
	app.get('/publisher/website/single', publishers.getWebsite);
	app.post('/publisher/websites', publisher.createWebsite);


	app.get('/advertiser', advertiser.index);
	app.post('/advertiser/signin', advertiser.signin);

	app.get('/advertiser/default', advertiser.default);
	app.get('/advertiser/ads', advertiser.getAds);
	app.post('/advertiser/ads', advertiser.createAd);


	app.get('/socket', routes.socket);
	app.get('/socketview', routes.socketview);

	app.get('/test', function(req, res) {
	      res.render('test.html', { title : 'Test'});
	  });

	app.get('*', routes.pagenotfound);

}