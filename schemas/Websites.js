var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Zone = new Schema({
    name: {type: String},
    kind: { type : String, enum: ['image','text','*'] },
    dimensions: { type: String},
    modified: {type: Date, default: Date.now },
    created: {type: Date},
    validatedOn: {type: Date},
});

//Define Ad for Publishers (redefined in Publishers.js)
var Website = new Schema({
    name: { type: String, required: true }, 
    url : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/, required: true, unique: true },
    description : { type : String },
    category : { type : String }, 
    validated : { type : Boolean, default: false },
    modified: { type: Date, default: Date.now },
    created: {type: Date},
    validatedOn: {type: Date},
    zones: [Zone]
});

WebsiteModel = mongoose.model('websites', Website);
