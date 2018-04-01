var map;
var infowindow;
var centralLoc = new google.maps.LatLng(39.6322683, -104.9800738);
var barRequest = {
    location: centralLoc,
    radius: 3219,
    types: ['bar'],
    openNow: true,
};
var cafeRequest = {
    location: centralLoc,
    radius: 3219,
    types: ['cafe'],
    openNow: true,
};
var restaurantRequest = {
    location: centralLoc,
    radius: 3219,
    types: ['restaurant'],
    openNow: true,
};
var movieRequest = {
    location: centralLoc,
    radius: 3219,
    types: ['movie_theater'],
    openNow: true,
};
var clubRequest = {
    location: centralLoc,
    radius: 3219,
    types: ['night_club'],
    openNow: true,
};
var parkRequest = {
    location: centralLoc,
    radius: 3219,
    types: ['park'],
    openNow: true,
};
function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        center: centralLoc,
        zoom: 15
    });
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(barRequest, callback);
    service.nearbySearch(cafeRequest, callback);
    service.nearbySearch(restaurantRequest, callback);
    service.nearbySearch(movieRequest, callback);
    service.nearbySearch(clubRequest, callback);
    service.nearbySearch(parkRequest, callback);
}
var option = function(type, vicinity, name) {
    this.type = type,
    this.vicinity = vicinity,
    this.name = name
}
var establishments = [{}];
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
        
        var optionsArray = [results];
        optionsArray.forEach(function(item, i) {
            for(i in item) {
                option=[item[i].name, item[i].vicinity, item[i].types];
               
                // console.log(option.bar);
                establishments.push(option);
                // console.log(this.types = [item[i].types]);
                // console.log(this.vicinity = [item[i].vicinity]);
            }
        });
        // console.log(establishments);
    }
}
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent("<div><strong>" + place.name + "</strong></div><div>" + place.vicinity + "</div>");
        infowindow.open(map, this); 
    });
    // var suggestions = (place.name + "address: " + place.vicinity);
    // console.log(suggestions);
}
google.maps.event.addDomListener(window, 'load', initialize)

