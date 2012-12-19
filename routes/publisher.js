var PM = require('../modules/publisher-manager.js');

exports.index = function(req, res){
  if(req.cookies.username == undefined || req.cookies.password == undefined){
    res.render('login-publisher.html', { title: 'Sign in to your Publisher account.' });
  } else {
    PM.autoLogin(req.cookies.username, req.cookies.password, function(o){
      if (o != null){
        req.session.username = o.username;
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
  PM.login(req.param('username'),req.param('password'), function(e,o) {
      if (!o){
        res.send(e, 400);
      } else{
        req.session.username = o.username;
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

exports.createWebsite = function(req,res) {
  console.log("Publisher attempt to create Website :");
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
        PM.addWebsite(req.session.username,req.body,function(e,o) {
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
  console.log("Publisher attempt to get single website");
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
        PM.getWebsites(req.session.username,null,null,function(e,o) {
          if(!o) {
            res.send(e, 400);
          }
          else {
            res.send(o, 200);
          }
        });
  }
}

exports.getWebsite = function(req, res){
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
  	PM.getWebsite(req.body.url,function(e,o){
  		if(!o) {
              res.send(e, 400);
            }
            else {
              res.send(o, 200);
            }
  	
  	});
  }


}