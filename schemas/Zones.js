var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Zone = new Schema({
    name: {type: String},
    kind: { type : String, enum: ['image','text','*'] },
    remuneration: { type: String ,enum: ['cpm', 'cpc', '*'] }, 
    modified: {type: Date, default: Date.now },
    created: {type: Date},
    validated : { type : Boolean, default: false },
    textColor: {type : String, default: "#333"},
    borderColor: {type: String, default: "#000"},
    bgColor: {type:String, default: "#fff"},
    titleColor: {type:String, default:"#2672ec"},
    impressionCount :  {type:Number, default: 0},
    validatedOn: {type: Date},
    dimensions : { type: String , enum: ['300x233','234x60','125x125','180x150','120x230','200x200','233x233'], default: "300x233" }
});

ZoneModel = mongoose.model('zones', Zone);
