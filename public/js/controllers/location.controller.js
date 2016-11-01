(function() {
  angular.module('forecast-app')
    .controller('LocationController', LocationController);

  LocationController.$inject = ['$scope', '$http', 'WeatherService', 'GoogleGeocodeService'];

  function LocationController($scope, $http, WeatherService, GoogleGeocodeService) {
    $scope.getWeather = getWeather;
    $scope.weather = WeatherService.weatherData;
    //$scope.log = log;
    $scope.$watch(function() {
      return WeatherService.weatherData;
    }, function(newVal, oldVal) {
      $scope.weather = WeatherService.weatherData;
    });
    $scope.getAddress = getAddress;
    $scope.getCoordinates = getCoordinates;

    function getWeather(lat, lon) {
      WeatherService.getWeather(lat, lon);
    }
    // function log() {
    //   console.log(WeatherService.weatherData);
    // }
    function getAddress(lat, lon) {
      $scope.address = GoogleGeocodeService.getAddress(lat, lon)
        .then(function(response) {
          // returns string for the DOM
          $scope.address = 'Google Maps estimates your location as: "' + response.data.results[0].formatted_address +'".';
        });
    }
    function getCoordinates(userAddress) {
      $scope.address = GoogleGeocodeService.getCoordinates(userAddress)
        .then(function(response) {
          // returns object with 'lat' and 'lng' parameters for the DOM
          $scope.coordinates = response.data.results[0].geometry.location;
        });
    }
  }
}());
