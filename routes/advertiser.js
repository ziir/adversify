var AM = require('../modules/account-manager.js');


exports.index = function(req, res){
  if(req.cookies.username == undefined || req.cookies.password == undefined){
    res.render('login-advertiser.html', { title: 'Sign in to your Advertiser account.' });
  } else {
    AM.autoLoginAdvertiser(req.cookies.username, req.cookies.password, function(o){
      if (o != null){
        req.session.user = o;
        req.session.kind = "advertiser";
        res.redirect('/advertiser/default');
      } else{
        res.render('login-advertiser.html', { title: 'Sign in to your Advertiser account.' });
      }
    });
  }
};

exports.signin = function(req, res){
  AM.loginAdvertiser(req.param('username'),req.param('password'), function(e,o) {
      if (!o){
        res.send(e, 400);
      } else{
        req.session.user = o;
        req.session.kind = "advertiser";
        if (req.param('remember-me') == 'on'){
          res.cookie('username', o.username, { maxAge: 900000 });
          res.cookie('password', o.password, { maxAge: 900000 });
        }
        res.send(o, 200);
      }
  });
}


exports.default = function(req,res) {
  if(req.session.kind != "advertiser") {
    res.redirect("/");
  } else {
    res.render('advertiser-default.html', { title: 'Advertiser'});
  }
}