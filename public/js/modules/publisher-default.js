$(document).ready(function() {
	
	WebSite = function(wbname, wburl) {
	    var self = this;
	    self.wbname = ko.observable(wbname);
	    self.wburl = ko.observable(wburl);
	}

	window.PublisherDefaultZone = Backbone.Model.extend({
		urlRoot : '/publisher/zones',
		
		defaults : {
			name 		: 'myName',
			mode 		: 'myMode',
			kind 		: 'myKind',
			description : 'myDescription'
			
		},
		
		validate : function(attributes) {
			$('#addZoneForm .adname').css('border', '0px solid red');
			
			console.log(attributes.url);
			
			var validated = new Backbone.Model({err_zonename : '',
												isOk	   : true});
			
			validated.isOk = true;
			validated.err_zonename = '';
			
			var reg = new RegExp('^[. - a-z A-Z 0-9 _]+$');
			if (!reg.test(attributes.name)) {
				validated.isOk = false; //Faire renvoyer FALSE
                $('#addZoneForm .zonename').css('border', '1px solid red');
                validated.err_zonename = 'Zone name is not correct';
			}
			
			return validated;
		},
		
		initialize : function PublisherDefaultAd() {
			console.log('');
			
			this.bind("error", function(model, error){ // Quand quelqu'un maitrise ça, il m'apelle
                console.log(error);
            });
		}
	});
	
	window.PublisherDefaultZones = Backbone.Collection.extend({
        model : PublisherDefaultZone,
        url   : '/publisher/zones',

        initialize : function() {
            //console.log('PublisherDefaultSites collection Constructor');
        }
    });

	window.PublisherDefaultSite = Backbone.Model.extend({
    	urlRoot : '/publisher/websites',
    	
    	defaults : {
            name 		: 'myName',
            url  		: 'http://www.myURL.com',
            category 	: 'myCategory',
            description : 'myDescription'
        },
        
        validate : function(attributes) {
        	$('#sign-container .sitename').css('border', '0px solid red');
        	$('#sign-container .siteurl').css('border', '0px solid red');

    		var isOk = true;
        	
        	var reg = new RegExp('^[. - a-z A-Z 0-9 _]+$');
        	if (!reg.test(attributes.name)) {
	        	isOk = false; //Faire renvoyer FALSE
	        	error_webSiteName('The name is incorrect');
                $('#sign-container .sitename').css('border', '1px solid red');
	        }
	        
	        reg = new RegExp('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}');
	        if (!reg.test(attributes.url)) {
	        	console.log(attributes.url);
		        isOk = true; //Faire renvoyer false plus tard après avoir fait RegExp
		        error_webSiteURL('This URL is not a valid URL');
		        $('#sign-container .siteurl').css('border', '1px solid red');
	        }
        	
        	return isOk;
        },
        
        initialize : function PublisherDefaultSite() {
            console.log('Site Created');
            
            this.bind("error", function(model, error){ // Quand quelqu'un maitrise ça, il m'apelle
                console.log(error);
            });
        }
    });
    
    window.PublisherDefaultSites = Backbone.Collection.extend({
        model : PublisherDefaultSite,
        url   : '/publisher/websites',

        initialize : function() {
            //console.log('PublisherDefaultSites collection Constructor');
        }
    });
    
    window.PublisherDefaultBehavior = Backbone.View.extend({
        el : $('#signup-forms'), // Changer l'element quand il y aura plus que 1 form
        
        initialize : function() {
            //Nothing to do now
        },
        
        events : {
            'submit #addWebSiteForm' : 'buildWebSite', // J'aime beaucoup ça
            'submit #addZoneForm'    : 'buildAd'
        },
        
        buildWebSite : function(e) {
           e.preventDefault();
           
           publisherDefaultSite = new PublisherDefaultSite({
	           name 	   : $('#addWebSiteForm .sitename').val(),
	           url  	   : $('#addWebSiteForm .siteurl').val(),
	           category    : $('#addWebSiteForm .sitecategory').val(),
	           description : $('#addWebSiteForm .sitedescription').val()
           });
           
           siteValidated = publisherDefaultSite.validate({
           		name 		: publisherDefaultSite.get('name'),
           		url	 		: publisherDefaultSite.get('websiteurl'),
           		category    : publisherDefaultSite.get('category'),
           		description : publisherDefaultSite.get('description')
           });
           
           if (siteValidated == true) {
           		newWebSite = new WebSite(publisherDefaultSite.get('name'), publisherDefaultSite.get('url'));
           		websites.push(newWebSite);
           		publisherDefaultSites.add(publisherDefaultSite);
	           	publisherDefaultSite.save();
	           	console.log('publisherDefaultSite Saved !');
           } else {
	            publisherDefaultSite = 0;
	            console.log('publisherDefaultSite Not Saved !');
           }
           
        },
        
        buildAd : function(e) {
           e.preventDefault();
           
           publisherDefaultZone = new PublisherDefaultZone({
	           name 	   : $('#addZoneForm .zonename').val(),
	           mode  	   : $('#addZoneForm .zoneremuneration').val(),
	           kind    	   : $('#addZoneForm .zoneformat').val(),
	           description : $('#addZoneForm .zonedescription').val(),
	           url		   : $('#addZoneForm .webSiteUrl').val()
           });
           
           zoneValidated = publisherDefaultZone.validate({
           		name 		: publisherDefaultZone.get('name'),
           		mode	 	: publisherDefaultZone.get('mode'),
           		kind    	: publisherDefaultZone.get('kind'),
           		description : publisherDefaultZone.get('description'),
           		url			: publisherDefaultZone.get('url')
           });
           
           if (zoneValidated.isOk) {
           		publisherDefaultZones.add(publisherDefaultZone);
           		publisherDefaultZone.save();
           		console.log('publisherDefaultAd Saved !');
           } else {
	            publisherDefaultZone = 0;
	            console.log('publisherDefaultAd Not Saved !');
           }
        },

        error : function(model, error) {
            console.log(model, error);
            return this;
        }
        
    });
    
    //BINDING WEBSITES AFTER FETCH
    var OnSuccessWebites = function() {
	    
	    function WebSitesViewModel() {
		    var self = this; 
		    
		    // Editable data
		    //self.websites = ko.observableArray();
		    self.websites = websites;
		    
		    for (i=0; i < publisherDefaultSites.length; i++) {
		    	var wb = publisherDefaultSites.at(i);
			    self.websites.push(new WebSite(wb.get('name'), wb.get('url')));
		    }
		}
		
		model = new WebSitesViewModel();
		
		return model;
    }
    
    //BINDING ZONES AFTER FETCH
    var OnSuccessZones = function() {
	    function Zone(zonename) {
		    var self = this;
		    self.zonename = ko.observable(zonename);
		}
	    
	    function AdsViewModel() {
		    var self = this; 
		    
		    // Editable data
		    //self.zones = ko.observableArray();
		    self.zones = zones;
		    
		    for (i=0; i < publisherDefaultZones.length; i++) {
		    	var zone = publisherDefaultZones.at(i);
			    self.zones.push(new Zone(zone.get('name')));
		    }
		}
		
		//ko.applyBindings(new AdsViewModel());
		
		model = new AdsViewModel();
		
		return model;
    }
    
    //BINDING ERRORS
	
	error_webSiteName 	  = ko.observable('');
	error_webSiteURL  	  = ko.observable('');
	error_zoneName	  	  = ko.observable('');
	error_zoneMode	  	  = ko.observable('');
	error_zoneKind	  	  = ko.observable('');
	error_zoneDescription = ko.observable('');
	websites = ko.observableArray();
	zones 	 = ko.observableArray();
    
    var ErrorsModel = kb.ViewModel.extend({
	    constructor: function(model) {
		    kb.ViewModel.prototype.constructor.call(this, model, {internals: ['error_webSiteName', 
		    																  'error_webSiteURL', 
		    																  'error_zoneName',
		    																  'error_zoneMode',
		    																  'error_zoneKind',
		    																  'error_zoneDescription']});
		    this.error_webSiteName = this._error_webSiteName;
		    this.error_webSiteURL = this._error_webSiteURL;
		    this.error_zoneName = this._error_zoneName;
		    this.error_zoneMode = this._error_zoneMode;
		    this.error_zoneKind = this._error_zoneKind;
		    this.error_zoneDescription = this._error_zoneDescription;
		    
		    return this;
	    }
    });
    
    view_model = new ErrorsModel(new Backbone.Model({error_webSiteName	   : '', 
													 error_webSiteURL 	   : '', 
													 error_zoneName   	   : '', 
													 error_zoneMode        : '',
													 error_zoneKind   	   : '',
													 error_zoneDescription : ''}));
    
    publisherDefaultSites = new PublisherDefaultSites();
    publisherDefaultSites.fetch({
    	success : OnSuccessWebites
    });
    
    publisherDefaultZones = new PublisherDefaultZones();
    publisherDefaultZones.fetch({
	    success : OnSuccessZones
    });
    
    publisherDefaultBehavior = new PublisherDefaultBehavior();
    
    //KO APPLY ALL
    ko.applyBindings([view_model]);

});