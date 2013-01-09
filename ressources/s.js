<script type="text/javascript">

function getLanguage() {
  //Get back the language of the website
    if (navigator.userLanguage == "string") {
  return(navigator.userLanguage);
    } else if (navigator.language == "string") {
  return(navigator.language);
    } else if (window.navigator.language) {
  return (window.navigator.language)
  } else {
  return("(Not supported)");
    }
}

  var _adv = _adv || [];
  _adv.push(['_setAccount', '1']);
  _adv.push(['_setWebsite', '1']);
  _adv.push(['codeName', navigator.appCodeName]);
  _adv.push(['r', Math.floor(Math.random()*99999999999)]);
  _adv.push(['appName', navigator.platform]);
  _adv.push(['userAgent', navigator.userAgent]);
  _adv.push(['language', getLanguage()]);
  _adv.push(['referer', document.referrer]);
  _adv.push(['_track']);

  (function() {
    var av = document.createElement('script'); av.type = 'text/javascript'; av.async = true;
    av.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.adversify.net/ad/'+_adv[0][1]+'/'+_adv[1][1]+'/'+_adv[3][1]+'/init.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(av, s);
  })();
</script>