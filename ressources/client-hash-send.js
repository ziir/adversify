var r = Math.floor(Math.random()*99999999999);
var adversifyclient = 1;




var xmlHttp;

function callServer(){
  try{
    // Opera 8.0+, Firefox, Safari
    xmlHttp = new XMLHttpRequest();
  } catch (e){
    // Internet Explorer Browsers
    try{
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try{
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e){
        // Ajax is not supported
        alert("Your browser does not support Ajax");
        return false;
      }
    }
  }
  xmlHttp.onreadystatechange=function()
  {
	  if (xmlHttp.readyState==4 && xmlHttp.status==200)
	    {
	    var h=xmlHttp.responseText;
	    alert(h);
	    }
  }
  var url = "http://www.adversify.net/h/c/"+r;
  xmlHttp.open("GET", url, true);
  xmlHttp.send();

}
callServer();