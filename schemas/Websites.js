var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Zone = new Schema({
    name: {type: String},
    kind: { type : String, enum: ['image','text','*'] },
    dimensions: { type: String},
    remuneration: { type: String ,enum: ['cpm', 'cpc', '*'] }, 
    modified: {type: Date},
    created: {type: Date},
    validated : { type : Boolean },
    colors : [{textColor: {type : String, default: "#333"}, borderColor: {type: String, default: "#000"}, bgColor: {type:String, default: "#fff"}, titleColor: {type:String, default:"#2672ec"}}] 
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
    zones: [Zone]
});

WebsiteModel = mongoose.model('websites', Website);
