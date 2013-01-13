var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PublisherWebsite = new Schema({
    name: { type: String},
    url : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/},
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
    balance: { type: Number, default:0 },
    websites: [PublisherWebsite]
});


PublisherModel = mongoose.model('publishers', Publisher);