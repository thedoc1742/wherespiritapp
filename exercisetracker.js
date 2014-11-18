var map;


function initialize(iconURL) {
  console.log('init');
  // Try HTML5 geolocation
  if(navigator.geolocation) {
    console.log('GEO');
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

     var myOptions = {
                zoom: 16,
                disableDefaultUI: true,
                //zoomControl   : 1,
                center: pos,
                mapTypeId: 'WhereSpirit Style'////ROADMAP, SATELLITE, HYBRID and TERRAIN
            };      

            // Create the Google Map, set options
            map = new google.maps.Map(document.getElementById('google_map'), myOptions);
            
            
            var featureOpts = [
  {
    "stylers": [
      { "color": "#a58080" },
      { "visibility": "simplified" }
    ]
  },{
    "featureType": "road",
    "stylers": [
      { "visibility": "simplified" },
      { "color": "#de80b8" }
    ]
  },{
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  }
  
];



    var styledMapOptions = {
      name: 'WhereSpirit Style'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    map.mapTypes.set('WhereSpirit Style', customMapType);
      
      var marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: iconURL,
      });
      
    }, function() {
      handleNoGeolocation(true);
    },        {

                enableHighAccuracy  : true,
                maximumAge          : 2000
                //maximumAge:Infinity
        });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
  
  console.log(content);

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}


             function makeApiCall() {
  gapi.client.load('plus', 'v1').then(function() {
    var request = gapi.client.plus.people.get({
        'userId': 'me'
          });
    request.then(function(resp) {
      var heading = document.createElement('h4');
      var image = document.createElement('img');
      image.src = resp.result.image.url;
      console.log(JSON.stringify(resp.result));
      initialize(resp.result.image.url);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  });
}

function getEmail(){
    // Laden der oauth2-Bibliotheken, um die userinfo-Methoden zu akitvieren.
    gapi.client.load('oauth2', 'v2', function() {
          var request = gapi.client.oauth2.userinfo.get();
          request.execute(getEmailCallback);
        });
  }
  
  function getEmailCallback(obj) {
       if(obj['email'])
            console.log(obj['email']);
       else
            console.log('Nix');
  }
             
             function signinCallback(authResult) {
               if (authResult['access_token']) {
                  // Autorisierung erfolgreich
                  // Nach der Autorisierung des Nutzers nun die Anmeldeschaltfläche ausblenden, zum Beispiel:
                  document.getElementById('signinButton').setAttribute('style', 'display: none');
                  makeApiCall();
                  getEmail();
                  $.mobile.changePage("#newhome");
               } else if (authResult['error']) {
                  // Es gab einen Fehler.
                  // Mögliche Fehlercodes:
                  //   "access_denied" – Der Nutzer hat den Zugriff für Ihre App abgelehnt.
                  //   "immediate_failed" – Automatische Anmeldung des Nutzers ist fehlgeschlagen.
                  console.log('Es gab einen Fehler: ' + authResult['Fehler']);
                }
              }


function showError() {

    alert("Error!!");

};