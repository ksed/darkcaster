(function() {
  angular.module('forecast-app')
    .factory('GoogleGeocodeService', GoogleGeocodeService);

  GoogleGeocodeService.$inject = ['$http'];

  function GoogleGeocodeService($http) {
    var urlPrefix = 'https://maps.googleapis.com/maps/api/geocode/json?';
    var service = {};
    service.coordinates = {};
    service.address = '';
    service.getAddress = getAddress;
    service.getCoordinates = getCoordinates;
    return service;

    function getAddress(lat, lon) {
      var url = urlPrefix + '&latlng=' + lat + ',' + lon;
      return $http.get(url)
                  .then(function(response) {
                    service.coordinates = {lat: lat, lng:lon};
                    service.address = response.data.results[0].formatted_address;
                  });
    }
    function getCoordinates(userAddress) {
      var url = urlPrefix + '&address=' + userAddress;
      return $http.get(url)
                  .then(function(response) {
                    service.coordinates = response.data.results[0].geometry.location;
                    service.address = userAddress;
                  });
    }
  }
}());
