(function() {
  angular.module('forecast-app')
    .controller('LocationController', LocationController);

  LocationController.$inject = ['$scope', '$http'];

  function LocationController($scope, $http) {
    $scope.getWeather = getWeather;
    $scope.getAddress = getAddress;

    function getWeather(lat, lon) {
      console.log(lat, lon);
    }
    function getAddress(lat, lon) {
      console.log('calling getGeocode...');
      $http({
        method: 'GET',
        //url: '/coordinates/' + lat + ',' + lon
        url: 'https://maps.googleapis.com/maps/api/geocode/json?&latlng=' + lat + ',' + lon
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.address = 'Google Maps estimates your location as: "' + response.data.results[0].formatted_address +'".';
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(response);
        });
    }
  }
}());
