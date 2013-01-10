var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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

var PublisherWebsite = new Schema({
    name: { type: String, required: true},
    url : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/, required: true, unique: true },
    description : { type : String },
    category : { type : String }, 
    validated : { type : Boolean, default: false },
    modified: { type: Date, default: Date.now },
    created: {type: Date},
})


var Publisher = new Schema({
    username: { type: String, required: true, match: /^[a-zA-Z0-9-_]+$/, unique: true },  
    password: { type: String, required: true},
    salt: { type: String, required: true},
    email: { type: String, unique: true, match : /[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}/, required: true },
    modified: { type: Date, default: Date.now },
    joined: {type: Date},
    streetadress: { type: String },
    city: { type: String },
    country: { type: String },
    phone: { type: String},
    clientid: { type: Number},
    websites: [PublisherWebsite]
});

//Define Ad for Publishers (redefined in Publishers.js)
var Zone = new Schema({
    name: {type: String},
    kind: { type : String, enum: ['image','text','all'] }, 
    modified: {type: Date},
    created: {type: Date},
    validated : { type : Boolean },
    colors : [{textColor: {type : String, default: "#333"}, borderColor: {type: String, default: "#000"}, bgColor: {type:String, default: "#fff"}, titleColor: {type:String, default:"#2672ec"}}] 
});

PublisherModel = mongoose.model('publishers', Publisher);
WebsiteModel = mongoose.model('websites', Website);
ZoneModel = mongoose.model('zones', Zone);
