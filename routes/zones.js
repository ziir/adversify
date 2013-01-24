var ZM = require('../modules/zone-manager.js');

exports.default = function(req, res){
   if(req.session.kind != "publisher") {
    res.redirect("/");
  } else {
    ZM.getZones(req.session.uid, function(e,o) {
      if(o) {
        console.log(o);
      res.render('zones.html', {
        title: "Zones overview",
          locals: {
            zones: o
          }
      });
    } else if(!o){
      console.log(e);
      console.log("------");
      console.log(o);
      res.send("no-zones-found-route");
    }
   });
  }
}
