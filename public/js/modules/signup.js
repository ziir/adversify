$(document).ready(function() {

    window.UserSignup = Backbone.Model.extend({
    	urlRoot : '/signup',

        validate : function(attributes) {
        	$('#sign-container .username').css('border', '0px solid red');
        	$('#sign-container .email').css('border', '0px solid red');
        	$('#sign-container .password').css('border', '0px solid red');
        	validated = new Backbone.Model({err_username: '', 
    										err_email: '',
        								 	err_pass: '', 
        								 	err_pass_again: '', 
        								 	err_kind: '',
        								 	isOk: true});
        	
        	//Check if username respects formatting
        	var reg = new RegExp('^[a-z0-9_]+$');
        	if (!reg.test(attributes.username)) {
	        	validated.isOk = false;
                $('#sign-container .username').css('border', '2px solid red');
                validated.err_username = 'Username is not correct';
                // var error = new event(htmlElement)-> { border rouge, error visible } // un truc du genre
	        }
        	//Check if email is a correct email adress
        	reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
        	if (!reg.test(attributes.email)) {
	        	validated.isOk = false;
	        	$('#sign-container .email').css('border', '2px solid red');
	        	validated.err_email = 'Email is not correct';
	        }
        	//Check if the password is correct
        	if (attributes.password.length < 8) {  //Définir une constante ?
	        	validated.isOk = false;
	        	$('#sign-container .password').css('border', '2px solid red');
	        	
	        	validated.err_pass = 'Password is not correct';
        	}
        	
        	return validated;
        },
        
        initialize : function User() {
            console.log('User Added');

            this.bind("error", function(model, error){ // Quand quelqu'un maitrise ça, il m'apelle
                console.log(error);
            });
        }
    });
    
    window.UserSignupBehavior = Backbone.View.extend({
        el : $('#signup-forms'), // Changer l'element quand il y aura plus que 1 form
        
        initialize : function() {
            //Nothing to do now
        },
        events : {
            'submit form' : 'buildUserSignup' // J'aime beaucoup ça
        },
        
        buildUserSignup : function(e) {
           e.preventDefault();
           
           this.$('.password_again').css('border', '0px solid red');
	       this.$('.kind').css('border', '0px solid red');
           
           //Get inputs values
	       userNameVal = this.$('.username').val();
	       passwordVal = this.$('.password').val();
	       passwordAgainVal = this.$('.password_again').val();
	       emailVal    = this.$('.email').val();
	       
           //Quel type de compte ?
    	   if (this.$('.kind').val() == 'publisher') {
	            type = 1;
    	   } else if (this.$('.kind').val() == 'advertiser') {
	            type = 0;
    	   } else {
        	   type = -1;
    	   }
	       
    	   user = new UserSignup ({
	        	username : userNameVal,
	            password : passwordVal,
	            email    : emailVal,
	            kind 	 : type
	        });
            
            validated = user.validate({    // JE PENSAIS QUE LE .validate était enclenché lors de la création de l'objet 
            	username : userNameVal,   // mais en fait non, en gros, le validate n'est AUTOMATIQUEMENT appelé que au moment
            	password : passwordVal,  // d'un publisher.set({username : 'Ziir'})  -- Possible que je me trompe 
            	email    : emailVal 	//Julien : Ceci dit ça revient au même niveau calculs pour l'ordinateur et le "validated" est plutôt intéressant au niveau des tests
            });                        // Non ça ne revient pas au même, l'objet ne peut pas être créé dans mon cas? quoique? 
            
            if (type == -1) {
	            this.$('.kind').css('border', '2px solid red');
	        	validated.err_kind = 'Please Select an account type';
	        	validated.isOk = false;
            }
            
            if (passwordVal != passwordAgainVal) {
	            this.$('.password_again').css('border', '2px solid red');
            	validated.err_pass_again = 'Password are not both alike';
            	validated.isOk = false;
            }

    	    if (validated.isOk == false) {
	            user = 0;
                console.log('Problem when creating the ' + type + '\n' +
	                	    'Please verify your data');
	        } else {
	            console.log('Rediriger maintenant');
	            user.save();
	        }
            
            //KNOCK BACK PART
        	var ContactViewModel = kb.ViewModel.extend({
			    constructor: function(model) {
				    kb.ViewModel.prototype.constructor.call(this, model, {internals: ['error_username', 
				    																  'error_email', 
				    																  'error_password',
				    																  'error_password_again',
				    																  'error_kind']});
				    this.error_username = this._error_username;
				    this.error_email = this._error_email;
				    this.error_password = this._error_password;
				    this.error_password_again = this._error_password_again;
				    this.error_kind = this._error_kind;
				    return this;
			    }
		    });
			
			view_model = new ContactViewModel(new Backbone.Model({error_username: validated.err_username, 
																  error_email: validated.err_email, 
																  error_password: validated.err_pass, 
																  error_password_again: validated.err_pass_again,
																  error_kind: validated.err_kind}));
			ko.applyBindings(view_model);
			kb.release(view_model);
        },
        
        error : function(model, error) {
            console.log(model, error);
            return this;
        }
        
    });
    
    userSignupBehavior = new UserSignupBehavior();
    
});
