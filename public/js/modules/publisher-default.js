$(document).ready(function() {
	
	Zone = function(zonename, zoneformat) {
	    var self = this;
	    self.zonename = zonename;
	    self.zoneformat = zoneformat;
    }
	
	WebSite = function(wbname, wburl, wbniceid, wbzones, i) {
	    var self = this;
	    self.wbname  		= ko.observable(wbname);
	    self.wburl   		= ko.observable(wburl);
	    self.webSiteNiceID  = wbniceid;
	    
	    zones	 			= ko.observableArray();
	    self.zones 			= zones;
	    
	    wb					= publisherDefaultSites.at(i);
	    newzones			= wb.get('zones');
	    
	    for (var a in newzones) {
	    	var zn = newzones[a];
		    self.zones.push(new Zone(zn.name, 'TODO'));
	    }
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
			$('#addZoneForm .zonename').css('border', '0px solid red');
			$('#addZoneForm .zoneremuneration').css('border', '0px solid red');
			$('#addZoneForm .zoneformat').css('border', '0px solid red');
			
			var isOk = true;
			
			error_zoneName('');
			error_zoneMode('');
			error_zoneKind('');
			error_zoneDescription('');
			
			var reg = new RegExp('^[. - a-z A-Z 0-9 _]+$');
			if (!reg.test(attributes.name)) {
				isOk = false; //Faire renvoyer FALSE
                $('#addZoneForm .zonename').css('border', '1px solid red');
                error_zoneName('The name is incorrect');
			}
			
			if (attributes.mode == '') {
				isOk = false;
				$('#addZoneForm .zoneremuneration').css('border', '1px solid red');
				error_zoneMode('Please select a mode');
			}
			
			if (attributes.kind == '') {
				isOk = false;
				$('#addZoneForm .zoneformat').css('border', '1px solid red');
				error_zoneKind('Please select a format');
			}
			
			return isOk;
		},
		
		initialize : function PublisherDefaultZone() {
			console.log('Zone Added !');
			
			this.bind("error", function(model, error){ // Quand quelqu'un maitrise ça, il m'apelle
                console.log(error);
            });
		}
	});
	
	window.PublisherDefaultZones = Backbone.Collection.extend({
		model   : PublisherDefaultZone,
		urlRoot : '/publisher/websites',
		
		initialize : function PublisherDefaultZones() {
			console.log('Zone Collection Added !');
			
			this.bind("error", function(model, error){ // Quand quelqu'un maitrise ça, il m'apelle
                console.log(error);
            });
		}
	})

	window.PublisherDefaultSite = Backbone.Model.extend({
    	urlRoot : '/publisher/websites',
    	
    	defaults : {
            name 		: 'myName',
            url  		: 'http://www.myURL.com',
            category 	: 'myCategory',
            description : 'myDescription'
        },
        
        validate : function(attributes) {
        	$('#addWebSiteForm .sitename').css('border', '0px solid red');
        	$('#addWebSiteForm .siteurl').css('border', '0px solid red');

    		var isOk = true;
    		
    		error_webSiteName('');
    		error_webSiteURL('');
        	
        	var reg = new RegExp('^[. - a-z A-Z 0-9 _]+$');
        	if (!reg.test(attributes.name)) {
	        	isOk = false; //Faire renvoyer FALSE
	        	error_webSiteName('The name is incorrect');
                $('#addWebSiteForm .sitename').css('border', '1px solid red');
	        }
	        
	        reg = new RegExp('(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i');
	        if (!reg.test(attributes.url)) {
	        	console.log(attributes.url);
		        isOk = false; //Faire renvoyer false plus tard après avoir fait RegExp
		        error_webSiteURL('This URL is not a valid URL');
		        $('#addWebSiteForm .siteurl').css('border', '1px solid red');
	        }
	        
	        if (attributes.category == '') {
		        isOk = false;
		        error_webSiteCategory('Please select a category');
		        $('#addWebSiteForm .sitecategory').css('border', '1px solid red');
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
            'submit #addZoneForm'    : 'buildZone',
            'click  .deleteWebsite'  : 'deleteWebSite'
        },
        
        buildWebSite : function(e) {
        	var formTarget = e.currentTarget;
           e.preventDefault();
           
           publisherDefaultSite = new PublisherDefaultSite({
	           name 	   : $('#addWebSiteForm .sitename').val(),
	           url  	   : $('#addWebSiteForm .siteurl').val(),
	           category    : $('#addWebSiteForm .sitecategory').val(),
	           description : $('#addWebSiteForm .sitedescription').val(),
	           zones	   : new PublisherDefaultZones(),
	           _id		   : ''
           });
           
           siteValidated = publisherDefaultSite.validate({
           		name 		: publisherDefaultSite.get('name'),
           		url	 		: publisherDefaultSite.get('url'),
           		category    : publisherDefaultSite.get('category'),
           		description : publisherDefaultSite.get('description')
           });
           
           if (siteValidated == true) {
	           	
	           	publisherDefaultSite.save();
	           	publisherDefaultSites.fetch({
		           	success : function(collection, response, options) {
		           		var publisherDefaultSite = publisherDefaultSites.at(publisherDefaultSites.length-1);
		           		if (publisherDefaultSite) {
			           		newWebSite = new WebSite(publisherDefaultSite.get('name'), publisherDefaultSite.get('url'), publisherDefaultSite.get('_id'));
			           		websites.push(newWebSite);
			           		formTarget.reset();
		           		}
			           	
			           	for (var i=0; i < publisherDefaultSites.length; i++) {
						    var model = publisherDefaultSites.at(i);
						    console.log('id = ' + model.get('_id') + ' ' + model.get('name'));
						}
		           	}
	           	});

           } else {
	            publisherDefaultSite = 0;
	            console.log('publisherDefaultSite Not Saved !');
           }
           
        },
        
        buildZone : function(e) {
        var formTarget = e.currentTarget;
           e.preventDefault();
           
           publisherDefaultZone = new PublisherDefaultZone({
	           name 	    : $('#addZoneForm .zonename').val(),
	           remuneration : $('#addZoneForm .zoneremuneration').val(),
	           kind    	    : $('#addZoneForm .zoneformat').val(),
	           format		: '',
	           description  : $('#addZoneForm .zonedescription').val(),
	           url		    : $('#addZoneForm .webSiteUrl').val(),
	           _id			: ''
           });
           
           zoneValidated = publisherDefaultZone.validate({
           		name 		 : publisherDefaultZone.get('name'),
           		remuneration : publisherDefaultZone.get('mode'),
           		kind    	 : publisherDefaultZone.get('kind'),
           		format		 : '',
           		description  : publisherDefaultZone.get('description'),
           		url			 : publisherDefaultZone.get('url')
           });
           
           if (zoneValidated == true) {
           		console.log('publisherDefaultZone Saved !');
           		publisherDefaultZone.save();
           		publisherDefaultSites.fetch({
	           		success : function(collection, response, options) {
		           		//newZone = new Zone('test1', 'test2');
		           		//wbzones.push(newZone);
		           		formTarget.reset();
	           		}
           		});
           		
           } else {
	            publisherDefaultZone = 0;
	            console.log('publisherDefaultAd Not Saved !');
           }
        },
        
        deleteWebSite : function(e) {
        	e.preventDefault();
        	
        	$.get('/publisher/websites/'+e.currentTarget.id+'/delete', function(data) {
        		console.log('GET /publisher/websites/'+e.currentTarget.id+'/delete');
	        	if (data == "OK") {
		        	$('#'+e.currentTarget.id).slideUp();
	        	} else {
		        	alert('cannot remove this fucking website');
	        	}
        	});
        	
        	console.log("j'ai clické !");
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
		    self.websites = websites;
		    
		    for (i=0; i < publisherDefaultSites.length; i++) {
		    	var wb = publisherDefaultSites.at(i);
			    self.websites.push(new WebSite(wb.get('name'), wb.get('url'), wb.get('_id'), wb.get('zones'), i));
			    
		    }
		}
		
		model = new WebSitesViewModel();
		
		return model;
    }
    
    //BINDING ERRORS
	
	error_webSiteName 	  = ko.observable('');
	error_webSiteURL  	  = ko.observable('');
	error_webSiteCategory = ko.observable('');
	
	error_zoneName	  	  = ko.observable('');
	error_zoneMode	  	  = ko.observable('');
	error_zoneKind	  	  = ko.observable('');
	error_zoneDescription = ko.observable('');
	
	websites = ko.observableArray();
    
    var ErrorsModel = kb.ViewModel.extend({
	    constructor: function(model) {
		    kb.ViewModel.prototype.constructor.call(this, model, {internals: ['error_webSiteName', 
		    																  'error_webSiteURL',
		    																  'error_webSiteCategory',
		    																  'error_zoneName',
		    																  'error_zoneMode',
		    																  'error_zoneKind',
		    																  'error_zoneDescription']});
		    this.error_webSiteName 	   = this._error_webSiteName;
		    this.error_webSiteURL 	   = this._error_webSiteURL;
		    this.error_webSiteCategory = this._error_webSiteCategory;
		    this.error_zoneName 	   = this._error_zoneName;
		    this.error_zoneMode 	   = this._error_zoneMode;
		    this.error_zoneKind 	   = this._error_zoneKind;
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
    
    publisherDefaultBehavior = new PublisherDefaultBehavior();
    
    //KO APPLY ALL
    ko.applyBindings([view_model]);

});