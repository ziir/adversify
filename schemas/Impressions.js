var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Zone = new Schema({
    dimensions : { type: String , enum: ['300x233','234x60','125x125','180x150','120x230','200x200','233x233'] }
});

var Impression = new Schema({
    occured: { type: Date, default: Date.now(); },
    pageUrl: {type: String},
    zone: [Zone]
   // why: Why,
}, capped: { size: 52428800, max: 100000 } );




ImpressionModel = mongoose.model('impressions', Impression);