 var start = Date.now();
	var cronJob = require('cron').CronJob;
	var job = new cronJob('1 * * * * *', function(){
	    // Runs every weekday (Monday through Friday)
	    // at 11:30:00 AM. It does not run on Saturday
	    // or Sunday.
	   
var end = Date.now();
var elapsed = (end - start) / 1000;
	  	console.log("You took " + elapsed + " seconds");
	  }, function () {
	  	console.log("Crontab finished omg!");


	    // This function is executed when the job stops
	  }, 
	  true /* Start the job right now */
	);