exports.signin = function(req, res){
  AM.loginAdvertiser(req.param('username'),req.param('password'), function(e,o) {
      if (!o){
        res.send(e, 400);
      } else{
        req.session.user = o;
        req.session.kind = "advertiser";
        if (req.param('remember-me') == 'true'){
          res.cookie('username', o.username, { maxAge: 900000 });
          res.cookie('password', o.password, { maxAge: 900000 });
        }
        res.send(o, 200);
      }
  });
}