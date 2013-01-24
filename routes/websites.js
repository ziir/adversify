var PM = require('../modules/publisher-manager.js');
var WM = require('../modules/website-manager.js');
var ZM = require('../modules/zone-manager.js');
var moment = require('moment');

exports.default = function(req, res){
   if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    console.log(req.session.uid);
    WM.getWebsites(req.session.username,null,null,function(e,o) {
      if(o) {
      var w = o;
      res.render('websites.html', {
        title: "Websites overview",
          locals: {
            websites: w
          }
  
      });
    } else {
      res.redirect("/");
    }
   });
  }
}
