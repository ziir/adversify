$(document).ready(function() {

	window.PublisherDefaultSite = Backbone.Model.extend({
    	urlRoot : '/publisher/websites',
    	
    	defaults : {
            name : 'myName',
            url : 'http://www.myURL.com'
        },
        
        validate : function(attributes) {
        	$('#sign-container .sitename').css('border', '0px solid red');
        	$('#sign-container .siteurl').css('border', '0px solid red');

        	var validated = new Backbone.Model({err_sitename: '', 
    											err_siteurl: '',
    											isOk: true});
    		validated.isOk = true;
    		validated.err_sitename = '';
    		validated.err_siteurl = '';
        	
        	var reg = new RegExp('^[. - a-z A-Z 0-9 _]+$');
        	if (!reg.test(attributes.name)) {
	        	validated.isOk = false; //Faire renvoyer FALSE
                $('#sign-container .sitename').css('border', '1px solid red');
                validated.err_sitename = 'Site name is not correct';
	        }
	        
	        reg = new RegExp('((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?', 'i');
	        if (!reg.test(attributes.url)) {
	        	console.log(attributes.url);
		        validated.isOk = false; //Faire renvoyer false plus tard après avoir fait RegExp
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
	           name : $('#sign-container .sitename').val(),
	           url  : $('#sign-container .siteurl').val()
           });
           
           siteValidated = publisherDefaultSite.validate({
           		name : publisherDefaultSite.get('name'),
           		url  : publisherDefaultSite.get('url')
           });
           
           if (siteValidated.isOk == true) {
	           	publisherDefaultSite.save();
           } else {
	            publisherDefaultSite = 0;
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
			view_model = new ErrorsViewModel(new Backbone.Model({error_webSiteName: siteValidated.err_sitename, 
																 error_webSiteURL: siteValidated.err_siteurl}));
		    //KO APPLY ALL
		    ko.applyBindings(view_model);
		    //RELEASE ALL
		    kb.release(view_model);
        },
        
        buildAd : function(e) {
           e.preventDefault();
           
           //console.log('Building Ad !');
        },

        error : function(model, error) {
            console.log(model, error);
            return this;
        }
        
    });
    
    //publisherDefaultSites = new PublisherDefaultSites();
    publisherDefaultBehavior = new PublisherDefaultBehavior();

});