var AM = require('../modules/account-manager.js');


exports.create = function(req,res){
  console.log("signup");
  AM.signup(req.body, function(e,o) {
    if (!o){
        res.send(e, 400); // Something went wrong
      } else{
        res.send(o, 200); // All good!
      }
  });
}



exports.step2 = function(req,res){
  AM.signupStep2(req.body, function(e,o) { // To do : AM.signupSte2()
    if (!o){
      res.send(e, 400); // Something went wrong
    } else{
      res.send(o, 200); // All good!
    }
  });
}

