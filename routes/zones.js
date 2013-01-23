var ZM = require('../modules/zone-manager.js');

exports.default = function(req, res){
   if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    ZM.getZones(req.session.uid, function() {
      if(o) {
      res.render('zones.html', {
        title: "Zones overview",
          locals: {
            zones: o
          }
  
      });
    } else {
      res.redirect("/");
    }
   });
  }
}
