var AM = require('../modules/account-manager.js');


exports.index = function(req, res){
  if(req.cookies.username == undefined || req.cookies.password == undefined){
    res.render('login-publisher.html', { title: 'Sign in to your Publisher account.' });
  } else {
    AM.autoLoginPublisher(req.cookies.username, req.cookies.password, function(o){
      if (o != null){
        req.session.user = o;
        req.session.kind = "publisher";
        res.redirect('/publisher/default');
      } else{
        res.render('login-publisher.html', { title: 'Sign in to your Publisher account.' });
      }
    });
  }
};

exports.signin = function(req, res){
  console.log(req.body);
  AM.loginPublisher(req.param('username'),req.param('password'), function(e,o) {
      if (!o){
        res.send(e, 400);
      } else{
        req.session.user = o;
        req.session.kind = "publisher";
        if (req.param('remember-me') == 'on'){
          res.cookie('username', o.username, { maxAge: 900000 });
          res.cookie('password', o.password, { maxAge: 900000 });
        }
        res.send(o, 200);
      }
  });
}

exports.default = function(req,res) {
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    res.render('publisher-default.html', { title: 'Publisher'});
  }
}




exports.ads = function(req, res){
  res.render('index.html', { title: 'Express' });
};

	exports.ads.list = function(req, res){
  		res.render('index.html', { title: 'Express' });
	};

	exports.ads.create = function(req, res){
  		res.render('index.html', { title: 'Express' });
	};

	exports.ads.update = function(req, res){
  		res.render('index.html', { title: 'Express' });
	};

	exports.ads.delete = function(req, res){
  		res.render('index.html', { title: 'Express' });
	};

exports.statistics = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.account = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.payments = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.sites = function(req, res){
  res.render('index.html', { title: 'Express' });
};