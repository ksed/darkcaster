(function() {
  angular.module('forecast-app')
    .factory('GoogleGeocodeService', GoogleGeocodeService);

  GoogleGeocodeService.$inject = ['$http'];

  function GoogleGeocodeService($http) {
    var urlPrefix = 'https://maps.googleapis.com/maps/api/geocode/json?';
    return {
      getAddress: getAddress,
      getCoordinates: getCoordinates
    };

    function getAddress(lat, lon) {
      var url = urlPrefix + '&latlng=' + lat + ',' + lon;
      return $http.get(url);
    }
    function getCoordinates(userAddress) {
      var url = urlPrefix + '&address=' + userAddress;
      return $http.get(url);
    }
  }
}());
