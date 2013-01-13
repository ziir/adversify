var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Why = new Schema({
    criterias: [{
        name: {type:String},
        
    }]
});

var Client = new Schema({
    userAgent: {type:String},
    referer: {type:String},
    language: {type: String},

});

var Page = new Schema({
    url: {type:String},
    
});

var Impression = new Schema({
    occured: { type: Date },
    zoneId: {type: Date},
    why: Why,
    page: Page,
    client: Client
});




PublisherModel = mongoose.model('publishers', Publisher);