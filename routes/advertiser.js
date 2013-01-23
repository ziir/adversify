var AdM = require('../modules/advertiser-manager.js');


exports.index = function(req, res){
  if(req.cookies.username == undefined || req.cookies.password == undefined){
    res.render('login-advertiser.html', { title: 'Login to your Advertiser account.' });
  } else {
    AdM.autoLogin(req.cookies.username, req.cookies.password, function(o){
      if (o != null){
        req.session.username = o.username;
        req.session.kind = "advertiser";
        res.redirect('/advertiser/default');
      } else{
        res.render('login-advertiser.html', { title: 'Login to your Advertiser account.' });
      }
    });
  }
};

exports.signin = function(req, res){
  console.log(req.body);
  AdM.login(req.param('username'),req.param('password'), function(e,o) {
      if (!o){
        res.send(e, 400);
        res.render('login-error.html', { title : 'Login error!'});
      } else{
        req.session.username = o.username;
        req.session.kind = "advertiser";
        if (req.param('remember-me') == 'on'){
          res.cookie('username', o.username, { maxAge: 900000 });
          res.cookie('password', o.password, { maxAge: 900000 });
        }
        res.redirect('/advertiser');
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

exports.createAd = function(req,res) {
  console.log("Advertiser attempt to create Website :");
  if(req.session.kind != "advertiser") {
    res.redirect("/");
  } else {
        AdM.addAd(req.session.username,req.body,function(e,o) {
      if(!o) {
          res.send(e, 400);
      }
      else {
        res.send(o, 200);
      }
    });
  }
}

exports.getWebsites = function(req,res) {
  console.log("Advertiser attempt to get single website");
  if(req.session.kind != "advertiser") {
    res.redirect("/");
  } else {
        AdM.getWebsites(req.session.username,null,null,function(e,o) {
          if(!o) {
              res.send(e, 400);
          }
          else {
            res.send(o, 200);
          }
        });
  }
}

exports.profile = function(req,res) {
    if(req.session.kind != "advertiser") {
    res.redirect("/");
  } else {
    res.render('advertiser-profile.html', { title: 'Publisher Profile'});
  }
}

exports.updateProfile = function(req,res) {
    if(req.session.kind != "advertiser") {
    res.redirect("/");
  } else 
        AdM.updateAccount(req.body,function(e,o) {
          if(!o) {
              res.send(e, 400);
          }
          else {
            res.send(o, 200);
          }
        });
  }