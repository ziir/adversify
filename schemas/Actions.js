var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Action = new Schema({
    name: {type: String},
    userId: {type: String},
    itemId: {type: String}
});

ActionModel = mongoose.model('actions', Action);
