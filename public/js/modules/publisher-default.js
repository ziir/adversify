$(document).ready(function() {

	error_webSiteName 	= '';
	error_webSiteURL  	= '';
	error_adName	  	= '';
	error_adMode	  	= '';
	error_adKind	  	= '';
	error_adDescription = '';
	websites = ko.observableArray();
	ads 	 = ko.observableArray();

	window.PublisherDefaultAd = Backbone.Model.extend({
		urlRoot : '/advertiser/ads',
		
		defaults : {
			name 		: 'myName',
			mode 		: 'myMode',
			kind 		: 'myKind',
			description : 'myDescription'
			
		},
		
		validate : function(attributes) {
			$('#sign-container .adname').css('border', '0px solid red');
			
			var validated = new Backbone.Model({err_adname : '',
												isOk	   : true});
			
			validated.isOk = true;
			validated.err_adname = '';
			
			var reg = new RegExp('^[. - a-z A-Z 0-9 _]+$');
			if (!reg.test(attributes.name)) {
				validated.isOk = false; //Faire renvoyer FALSE
                $('#sign-container .adname').css('border', '1px solid red');
                validated.err_adname = 'Ad name is not correct';
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
	
	window.PublisherDefaultAds = Backbone.Collection.extend({
        model : PublisherDefaultAd,
        url   : '/publisher/ads',

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

        	var validated = new Backbone.Model({err_sitename : '', 
    											err_siteurl  : '',
    											isOk		 : true});
    		validated.isOk         = true;
    		validated.err_sitename = '';
    		validated.err_siteurl  = '';
        	
        	var reg = new RegExp('^[. - a-z A-Z 0-9 _]+$');
        	if (!reg.test(attributes.name)) {
	        	validated.isOk = false; //Faire renvoyer FALSE
                $('#sign-container .sitename').css('border', '1px solid red');
                validated.err_sitename = 'Site name is not correct';
	        }
	        
	        reg = new RegExp('((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?', 'i');
	        if (!reg.test(attributes.url)) {
	        	console.log(attributes.url);
		        validated.isOk = true; //Faire renvoyer false plus tard après avoir fait RegExp
		        $('#sign-container .siteurl').css('border', '1px solid red');
		        validated.err_siteurl = 'URL is not correct';
	        }
        	
        	return validated;
        },
        
        initialize : function PublisherDefaultSite() {
            console.log('Site Added');
            
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
            'submit #addAdForm'      : 'buildAd'
        },
        
        buildWebSite : function(e) {
           e.preventDefault();
           
           publisherDefaultSite = new PublisherDefaultSite({
	           name 	   : $('#sign-container .sitename').val(),
	           url  	   : $('#sign-container .siteurl').val(),
	           category    : $('#sign-container .sitecategory').val(),
	           description : $('#sign-container .sitedescription').val()
           });
           
           siteValidated = publisherDefaultSite.validate({
           		name 		: publisherDefaultSite.get('name'),
           		url	 		: publisherDefaultSite.get('websiteurl'),
           		category    : publisherDefaultSite.get('category'),
           		description : publisherDefaultSite.get('description')
           });
           
           if (siteValidated.isOk == true) {
           		publisherDefaultSites.add(publisherDefaultSite);
	           	publisherDefaultSite.save();
	           	console.log('publisherDefaultSite Saved !');
           } else {
	            publisherDefaultSite = 0;
	            console.log('publisherDefaultSite Not Saved !');
           }
           
           //KO BINDING ERRORS
           var ErrorsViewModel = kb.ViewModel.extend({
			    constructor: function(model) {
				    kb.ViewModel.prototype.constructor.call(this, model, {internals: ['error_webSiteName', 
				    																  'error_webSiteURL']});
				    this.error_webSiteName = this._error_webSiteName;
				    this.error_webSiteURL  = this._error_webSiteURL;
				    return this;
			    }
			});
			
			errors_model = new ErrorsViewModel(new Backbone.Model({error_webSiteName: siteValidated.err_sitename, 
																   error_webSiteURL: siteValidated.err_siteurl}));
		    //KO APPLY ALL
		    ko.applyBindings(errors_model);
		    //RELEASE ALL
		    kb.release(errors_model);
        },
        
        buildAd : function(e) {
           e.preventDefault();
           
           publisherDefaultAd = new PublisherDefaultAd({
	           name 	   : $('#sign-container .adname').val(),
	           mode  	   : $('#sign-container .adremuneration').val(),
	           kind    	   : $('#sign-container .adformat').val(),
	           description : $('#sign-container .addescription').val()
           });
           
           adValidated = publisherDefaultAd.validate({
           		name 		: publisherDefaultAd.get('name'),
           		mode	 	: publisherDefaultAd.get('mode'),
           		kind    	: publisherDefaultAd.get('kind'),
           		description : publisherDefaultAd.get('description')
           });
           
           if (adValidated.isOk) {
	           publisherDefaultAds.add(publisherDefaultAd);
	           publisherDefaultAd.save();
	           console.log('publisherDefaultAd Saved !');
           } else {
	            publisherDefaultAd = 0;
	            console.log('publisherDefaultAd Not Saved !');
           }
           
           //KO BINDING ERRORS
           var ErrorsViewModel = kb.ViewModel.extend({
			    constructor: function(model) {
				    kb.ViewModel.prototype.constructor.call(this, model, {internals: ['error_adName']});
				    this.error_adName = this._error_adName;
				    return this;
			    }
			});
			
			errors_model = new ErrorsViewModel(new Backbone.Model({error_adName: adValidated.err_adname}));
		    //KO APPLY ALL
		    ko.applyBindings(errors_model);
		    //RELEASE ALL
		    kb.release(errors_model);
           
        },

        error : function(model, error) {
            console.log(model, error);
            return this;
        }
        
    });
    
    //BINDING WEBSITES AFTER FETCH
    var OnSuccessWebites = function() {
	    function WebSite(wbname, wburl) {
		    var self = this;
		    self.wbname = ko.observable(wbname);
		    self.wburl = ko.observable(wburl);
		}
	    
	    function WebSitesViewModel() {
		    var self = this; 
		    
		    // Editable data
		    self.websites = ko.observableArray();
		    
		    for (i=0; i < publisherDefaultSites.length; i++) {
		    	var wb = publisherDefaultSites.at(i);
			    self.websites.push(new WebSite(wb.get('name'), wb.get('url')));
		    }
		}
	
		ko.applyBindings(new WebSitesViewModel());
    }
    
    //BINDING ADS AFTER FETCH
    var OnSuccessAds = function() {
	    function Ad(adname) {
		    var self = this;
		    self.adname = ko.observable(adname);
		}
	    
	    function AdsViewModel() {
		    var self = this; 
		    
		    // Editable data
		    self.ads = ko.observableArray();
		    
		    for (i=0; i < publisherDefaultAds.length; i++) {
		    	var ad = publisherDefaultAds.at(i);
			    self.websites.push(new Ad(ad.get('name')));
		    }
		}
	
		ko.applyBindings(new AdsViewModel());
    }
	
	publisherDefaultSites = new PublisherDefaultSites();
    publisherDefaultSites.fetch({
    	success : OnSuccessWebites
    });
    
    publisherDefaultAds = new PublisherDefaultAds();
    publisherDefaultAds.fetch({
	    success : OnSuccessAds
    });
    
    publisherDefaultBehavior = new PublisherDefaultBehavior();

});