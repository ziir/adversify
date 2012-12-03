$(document).ready(function() { 

    window.UserSignup = Backbone.Model.extend({
    	urlRoot : 'http://www.adversify.net/signup',

        validate : function(attributes) {        	
        	validated = true;
        	
        	//Check if username respects formatting
        	var reg = new RegExp('^[a-z0-9_]+$');
        	if (!reg.test(attributes.username)) {
	        	validated = false; // Ya un truc à faire de mieux
                $('#publisher-advertising-form .username').css('border', '2px solid red');

                // var error = new event(htmlElement)-> { border rouge, error visible } // un truc du genre
	        }
        	//Check if email is a correct email adress
        	reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
        	if (!reg.test(attributes.email)) {
	        	validated = false;
	        	$('#publisher-advertising-form .email').css('border', '2px solid red');
	        	
	        }
        	//Check if the password is correct
        	if (attributes.password.length < 8) {  //Définir une constante ?
	        	validated = false;
	        	$('#publisher-advertising-form .password').css('border', '2px solid red');
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
    
    
    /*window.Advertiser = window.UserSignup.extend({
	    initialize : function Publisher() {
            console.log('Advertiser Added');

            this.bind("error", function(model, error){ // Quand quelqu'un maitrise ça, il m'apelle
                console.log(error);
            });
        }
    })
    
    window.Publisher = window.UserSignup.extend({
                  
        initialize : function Publisher() {
            console.log('Publisher Added');

            this.bind("error", function(model, error){ // Quand quelqu'un maitrise ça, il m'apelle
                console.log(error);         // To-Do : lire le code commenté de backbone
            });
        }
    });*/
    
    
    window.UserSignupBehavior = Backbone.View.extend({
        el : $('#publisher-advertising-form'), // Changer l'element quand il y aura plus que 1 form
        
        initialize : function() {
            //Nothing to do now
        },
        events : {
            'submit form' : 'buildUserSignup' // J'aime beaucoup ça
        },
        
        buildUserSignup : function(e) {
            e.preventDefault();
            
            //Get inputs values
            userNameVal = this.$('.username').val();
            passwordVal = this.$('.password').val();
            passwordAgainVal = this.$('.password_again').val();
            emailVal    = this.$('.email').val();
            
            if (passwordVal === passwordAgainVal) {
            
        	   //Vérifier si advertiser or publisher
        	   // créer l'objet en conséquence
        	   var user, type;
        	   
        	   if (this.$('.kind').val() == 'publisher') {
		            type = 'Publisher';
        	   } 
               if (this.$('.kind').val() == 'advertiser') {
		            type = 'Advertiser';
        	   }
        	   
        	   user = new UserSignup ({
			        	username : userNameVal,
			            password : passwordVal,
			            email    : emailVal,
			            kind 	 : type
		        });
	            
	            validated = user.validate({  // JE PENSAIS QUE LE .validate était enclenché lors de la création de l'objet 
	            	username : userNameVal,   // mais en fait non, en gros, le validate n'est AUTOMATIQUEMENT appelé que au moment
	            	password : passwordVal,  // d'un publisher.set({username : 'Ziir'})  -- Possible que je me trompe 
	            	email    : emailVal 	//Julien : Ceci dit ça revient au même niveau calculs pour l'ordinateur et le "validated" est plutôt intéressant au niveau des tests
	            });                         // Non ça ne revient pas au même, l'objet ne peut pas être créé dans mon cas? quoique? 
	            
	            if (!validated) {
		            user = 0;
	                alert('Problem when creating the ' + type + '\n' +
	                	  'Please verify your data');
	            } else {
	                console.log('Rediriger maintenant');
	                user.save();
	            }
	            
            } else {
            	this.$('.password_again').css('border', '3px solid red');
            }
        },
        
        error : function(model, error) {
            console.log(model, error);
            return this;
        }
        
    });
    
    userSignupBehavior = new UserSignupBehavior();
    
});
