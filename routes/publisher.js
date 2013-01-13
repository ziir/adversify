var PM = require('../modules/publisher-manager.js');
var WM = require('../modules/website-manager.js');
var ZM = require('../modules/zone-manager.js');
var io = require('socket.io');

exports.index = function(req, res){
  if(req.cookies.username == undefined || req.cookies.password == undefined){
    res.render('login-publisher.html', { title: 'Sign in to your Publisher account.' });
  } else {
    PM.autoLogin(req.cookies.username, req.cookies.password, function(o){
      if (o != null){
        req.session.username = o.username;
        req.session.uid = o._id;
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
        req.session.uid = o._id;
        req.session.kind = "publisher";
        if (req.param('remember-me') == 'on'){
          res.cookie('username', o.username, { maxAge: 900000 });
          res.cookie('password', o.password, { maxAge: 900000 });
        }
        res.send("OK", 200);
      }
  });
}

exports.default = function(req,res) {
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    console.log(req.session.uid);
    res.render('publisher-default.html', {
      title: "Ad{versify}",
          locals: {
            uid: req.session.uid
          }
    });
  }
}

exports.createWebsite = function(req,res) {
  console.log("Publisher attempt to create Website :");
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
        WM.addWebsite(req.session.username,req.body,function(e,o) {
          if(!o) {
              res.send(e, 400);
          }
          else {
            res.send(o, 200);
          }
        });
  }
}

exports.createZone = function(req,res) {
  console.log("Publisher attempt to create Zone for website : "+req.body.url);
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
        ZM.addZone(req.session.username,req.body,function(e,o) {
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
  console.log("Publisher attempt to get all his websites");
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
        WM.getWebsites(req.session.username,null,null,function(e,o) {
          if(!o) {
            res.send(e, 400);
          }
          else {
            res.send(o, 200);
          }
        });
  }
}

exports.deleteWebsite = function(req,res) {
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    console.log("IZI IZI ?")
    WM.deleteWebsite(req.session.username,req.param('id'),function(e,o){
      if(e) {
        res.send(e, 400);
            console.log("NO NO NO?")
      } else if(o === "OK") {
        res.send("OK", 200);
            console.log("YES YES YES")

      }
    });
  }
}

exports.getWebsite = function(req, res){
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
  	WM.getWebsite(req.body.url,function(e,o){
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
    if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    res.render('publisher-profile.html', { title: 'Publisher Profile'});
  }
}

exports.updateProfile = function(req,res) {
    if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
        PM.updateAccount(req.session.username,req.body,function(e,o) {
          if(!o) {
              res.send(e, 400);
          }
          else {
            res.send(o, 200);
          }
        });
  }
}

exports.get = function(req,res) {
    if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    PM.get(req.session.username, function(e,o) {
      if(!o) {
          res.send(e,400);
      } else  {
          res.send(o,200);
      }
    });
  }  
}

exports.getProfile = function(req,res) {
    if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    PM.getProfile(req.session.username, function(e,o) {
      if(!o) {
          res.send(e,400);
      } else  {
          res.send(o,200);
      }
    });
  }  
}


exports.test = function(req,res) {
  WebsiteModel.findOne(null,function(e,o) {
    res.send(o.zones);
  });
}

/*

// NOT TESTED PASSWORD CHANGE
exports.changePassword = function(req,res) {
  if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    PM.checkPassword(req.body.u,req.body.password,function(e) {
      if(!e) { 
        PM.setPassword(req.session.username,req.body.password function(e,o) {
          if(!o) {
              res.send(e,400);
          } else  {
              res.send(o,200);
          }
      });
      } else {
        res.send(e,400);
      }

    });
  }  
}*/