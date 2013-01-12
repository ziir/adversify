var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Define Ad for Publishers (redefined in Publishers.js)
var Zone = new Schema({
    name: {type: String},
    kind: { type : String, enum: ['image','text','*'] },
    dimensions: { type: String},
    remuneration: { type: String ,enum: ['cpm', 'cpc', '*'] }, 
    modified: {type: Date, default: Date.now },
    created: {type: Date},
    validated : { type : Boolean, default: false },
    textColor: {type : String, default: "#333"},
    borderColor: {type: String, default: "#000"},
    bgColor: {type:String, default: "#fff"},
    titleColor: {type:String, default:"#2672ec"} 
});

ZoneModel = mongoose.model('zones', Zone);
