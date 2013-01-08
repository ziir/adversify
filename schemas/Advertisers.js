var mongoose = require('mongoose');

var Schema = mongoose.Schema;


//Redefined Ad for Advertiser's ad(s)
var Ad = new Schema({
    name: {type: String},
    remuneration: [{ cp: {type: String ,enum: ['cpm', 'cpc']}, repartition: [{ cpm: {type:Number}, cpc: {type:Number}}] }],
    kind: { type : String, enum: ['image','text'] }, 
    modified: {type: Date},
    created: {type: Date},
    validated : { type : Boolean },
    colors : [{textColor: {type : String, default: "#333"}, borderColor: {type: String, default: "#000"}, bgColor: {type:String, default: "#fff"}, titleColor: {type:String, default:"#2672ec"}}] 
});

var Advertiser = new Schema({
    username: { type: String, required: true, match: /^[a-zA-Z0-9-_]+$/, unique: true },  
    password: { type: String, required: true},
    salt: { type: String, required: true},
    email: { type: String, unique: true, match : /[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}/,required: true },
    modified: { type: Date, default: Date.now },
    joined: {type: Date},
    streetadress: { type: String },
    city: { type: String },
    country: { type: String },
    phone: { type: String},
    ads: [Ad]
});

AdvertiserModel = mongoose.model('advertisers', Advertiser);
