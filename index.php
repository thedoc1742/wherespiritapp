<!--
  Copyright (c) 2011 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License"); you may not
  use this file except in compliance with the License. You may obtain a copy of
  the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
  License for the specific language governing permissions and limitations under
  the License.

  To run this sample, replace YOUR API KEY with your application's API key.
  It can be found at https://code.google.com/apis/console/?api=plus under API Access.
  Activate the Google+ service at https://code.google.com/apis/console/ under Services
-->
<!DOCTYPE html>
<html>
  <head>    
    <meta charset='utf-8' />
    <style>
      #map-canvas {
        height: 300px;
        width: 300px;
        margin: auto;
        padding: 0px
      }
    </style>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDJN5S_jh_wM8zC9dUxI_mZlCeRiFE0om8"></script>

    <script>
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map;

function initialize(iconURL) {
  var mapOptions = {
    zoom: 17
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      
      var marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: iconURL,
      });
      
      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
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

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}


    </script>
    
    <script>
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
               } else if (authResult['error']) {
                  // Es gab einen Fehler.
                  // Mögliche Fehlercodes:
                  //   "access_denied" – Der Nutzer hat den Zugriff für Ihre App abgelehnt.
                  //   "immediate_failed" – Automatische Anmeldung des Nutzers ist fehlgeschlagen.
                  console.log('Es gab einen Fehler: ' + authResult['Fehler']);
                }
              }
    </script>
  </head>
  <body>
    <div id="content">
     <div id="map-canvas"></div>
    </div>
    <span id="signinButton">
      <span
        class="g-signin"
        data-callback="signinCallback"
        data-clientid="1074302660216-a693sbd2ght96v6a5l4amrp91cekeuk2.apps.googleusercontent.com"
        data-cookiepolicy="single_host_origin"
        data-requestvisibleactions="http://schemas.google.com/AddActivity"
        data-scope="https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email"
        data-width="iconOnly">
      </span>
    </span>
    <script type="text/javascript">
      (function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();
    </script>
  </body>
</html>
