(function() {
  angular.module('forecast-app')
    .controller('LocationController', LocationController);

  LocationController.$inject = ['$scope', 'WeatherService', 'GoogleGeocodeService'];

  function LocationController($scope, WeatherService, GoogleGeocodeService) {
    $scope.getWeather = getWeather;
    $scope.getWeatherAddress = getWeatherAddress;
    $scope.weather = WeatherService.weatherData;
    //$scope.log = log;
    $scope.$watch(function() {
      return WeatherService.weatherData;
    }, function(newVal, oldVal) {
      $scope.weather = WeatherService.weatherData;
      $scope.latitude = WeatherService.lat;
      $scope.longitude = WeatherService.lon;
    });
    $scope.$watch(function() {
      return GoogleGeocodeService.coordinates;
    }, function(newVal, oldVal) {
      $scope.address = GoogleGeocodeService.address;
      $scope.coordinates = GoogleGeocodeService.coordinates;
    });
    // $scope.getAddress = getAddress;
    // $scope.getCoordinates = getCoordinates;

    function getWeather(lat, lon) {
      $scope.address = GoogleGeocodeService.getAddress(lat, lon)
        .then(function(response) {
          // returns string for the DOM
          $scope.address = GoogleGeocodeService.address;
          WeatherService.getWeather(lat, lon);
        });
    }
    // function getAddress(lat, lon) {
    //   $scope.address = GoogleGeocodeService.getAddress(lat, lon)
    //     .then(function(response) {
    //       // returns string for the DOM
    //       $scope.address = GoogleGeocodeService.address;
    //     });
    // }
    // function getCoordinates(userAddress) {
    //   $scope.coordinates = GoogleGeocodeService.getCoordinates(userAddress)
    //     .then(function(response) {
    //       // returns object with 'lat' and 'lng' parameters for the DOM
    //       $scope.coordinates = GoogleGeocodeService.coordinates;
    //     });
    // }
    function getWeatherAddress(userAddress) {
      $scope.coordinates = GoogleGeocodeService.getCoordinates(userAddress)
        .then(function(response) {
          // returns object with 'lat' and 'lng' parameters for the DOM
          $scope.coordinates = GoogleGeocodeService.coordinates;
          WeatherService.getWeather(GoogleGeocodeService.coordinates.lat, GoogleGeocodeService.coordinates.lng);
        });
    }
    //   console.log(WeatherService.weatherData);
    // function log() {
    //   console.log(WeatherService.weatherData);
    // }
  }
}());
