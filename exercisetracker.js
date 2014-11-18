$('#newhome').live("pagebeforeshow", function() {

        navigator.geolocation.getCurrentPosition(function(position){

            //showMap('mapHome',position.coords.latitude, position.coords.longitude);// Canvas, lat, long

            var latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

            // Google Map options
            var myOptions = {
                zoom: 16,
                disableDefaultUI: true,
                //zoomControl   : 1,
                center: latLng,
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
        marker = new google.maps.Marker({
               position: latLng,
               map: map,
               title: 'Da sind wir!',
               draggable: true
            });
            
        }, 
        showError, 
        {

                enableHighAccuracy  : true,
                maximumAge          : 2000
                //maximumAge:Infinity
        });
})  



function showError() {

    alert("Error!!");

};