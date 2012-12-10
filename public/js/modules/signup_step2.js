$(document).ready(function() {

    window.UserSignupStep2 = Backbone.Model.extend({
    	urlRoot : '/signup/step2',

        validate : function(attributes) {
        	$('#sign-container .streetadress').css('border', '0px solid red');
        	$('#sign-container .city').css('border', '0px solid red');
        	$('#sign-container .postalcode').css('border', '0px solid red');
        	validated = new Backbone.Model({err_streetadress: '', 
    										err_city: '',
        								 	err_postalcode: '',
        								 	err_country: '',
        								 	isOk: true});
        	
        	//Check if username respects formatting
        	var reg = new RegExp('^[0-9A-Za-z ]+$');
        	if (!reg.test(attributes.streetAdress)) {
	        	validated.isOk = false;
                $('#sign-container .streetadress').css('border', '2px solid red');
                validated.err_streetAdress = 'This is not an adress';
                // var error = new event(htmlElement)-> { border rouge, error visible } // un truc du genre
	        }
        	//Check if email is a correct email adress
        	reg = new RegExp('^[a-zA-Z-]+$');
        	if (!reg.test(attributes.city)) {
	        	validated.isOk = false;
	        	$('#sign-container .city').css('border', '2px solid red');
	        	validated.err_city = 'This City doesn\'t exist';
	        }
        	//Check if the password is correct
        	reg = new RegExp('^[0-9]+$');
        	if (attributes.postalCode.length < 5 || attributes.postalCode.length > 5 || !reg.test(attributes.postalCode)) {  //Définir une constante ?
	        	validated.isOk = false;
	        	$('#sign-container .postalcode').css('border', '2px solid red');
	        	
	        	validated.err_postalcode = 'This is not a valid postal code';
        	}
        	
        	return validated;
        },
        
        initialize : function UserStep2() {
            console.log('User Step 2 Added');

            this.bind("error", function(model, error){ // Quand quelqu'un maitrise ça, il m'apelle
                console.log(error);
            });
        }
    });
    
    window.UserSignupStep2Behavior = Backbone.View.extend({
        el : $('#signup-forms'), // Changer l'element quand il y aura plus que 1 form
        
        initialize : function() {
            //Nothing to do now
        },
        events : {
            'submit form' : 'buildUserSignupStep2' // J'aime beaucoup ça
        },
        
        buildUserSignupStep2 : function(e) {
           e.preventDefault();
           
	       this.$('.country').css('border', '0px solid red');
           
           //Get inputs values
	       _streetadress = this.$('.streetadress').val();
	       _city = this.$('.city').val();
	       _postalcode = this.$('.postalcode').val();
	       _country = this.$('.country').val();
	       
		   userStep2 = new UserSignupStep2 ({
	        	streetAdress : _streetadress,
	            city 		 : _city,
	            postalCode   : _postalcode,
	            country		 : _country
	        });
	        
	        validated = userStep2.validate({
	        	streetAdress : _streetadress,
	            city 		 : _city,
	            postalCode   : _postalcode,
	            country		 : _country
	        });
            
           //On vérifie le pays
    	   if (this.$('.country').val() == this.$('.country').attr('title')) {
	           this.$('.country').css('border', '2px solid red');
	    	   validated.err_country = 'Please Select a country';
	    	   validated.isOk = false;
    	   }
            
    	    if (validated.isOk == false) {
	            userStep2 = 0;
	            console.log('User not valid : problem');
	        } else {
	            console.log('Rediriger maintenant');
	            userStep2.save();
	            //document.location.href="/signup/step2"; //REDIRIGER TIMOTHEE
	        }
            
            //KNOCK BACK PART
        	var ContactViewModel = kb.ViewModel.extend({
			    constructor: function(model) {
				    kb.ViewModel.prototype.constructor.call(this, model, {internals: ['error_streetadress', 
				    																  'error_city', 
				    																  'error_postalcode',
				    																  'error_country']});
				    this.error_streetadress = this._error_streetadress;
				    this.error_city = this._error_city;
				    this.error_postalcode = this._error_postalcode;
				    this.error_country = this._error_country;
				    return this;
			    }
		    });
			
			view_model = new ContactViewModel(new Backbone.Model({error_streetadress: validated.err_streetadress, 
																  error_city: validated.err_city, 
																  error_postalcode: validated.err_postalcode, 
																  error_country: validated.err_country}));
			ko.applyBindings(view_model);
			kb.release(view_model);
        },
        
        error : function(model, error) {
            console.log(model, error);
            return this;
        }
        
    });
    
    userSignupStep2Behavior = new UserSignupStep2Behavior();
    
});
