var PM = require('../modules/publisher-manager.js');
var WM = require('../modules/website-manager.js');
var ZM = require('../modules/zone-manager.js');

exports.default = function(req, res){
   if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    WM.getWebsites(req.session.username,null,null,function(e,o) {
      if(o) {
      var w = o;
      res.render('zones.html', {
        title: "Zones overview",
          locals: {
            websites: w.zones
          }
  
      });
    } else {
      res.redirect("/");
    }
   });
  }
}
