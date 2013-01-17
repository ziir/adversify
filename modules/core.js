var hashIds = require("hashids");
var Core = {}; // Delivery Module, requests from the client on the publisher website.
module.exports = Core;

Core.OutputOrError = function(e,o, callback) {
  if(e) {
    callback(e);
  } else if(o) {
    callback(null,o);
  } else {
    callback("Something unexpected occured");
  }
}
