  var r = Math.floor(Math.random()*99999999999);
  var adversifyclient = 1;




  var xmlHttp;

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
      }
    }
  }

  xmlHttp.onreadystatechange=function()
  {
    if (xmlHttp.readyState==4 && xmlHttp.status==200)
      {
        var h=xmlHttp.responseText;
          var url = "http://www.adversify.net/h/"+h;
          xmlHttp.open("GET", url, true);
          xmlHttp.send(null);
      }
  }
  var url = "http://www.adversify.net/h/c/"+r;
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);