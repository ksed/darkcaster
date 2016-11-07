(function() {
  angular.module('forecast-app')
    .controller('LocationController', LocationController);

  LocationController.$inject = ['$scope', 'WeatherService', 'GoogleGeocodeService'];

  function LocationController($scope, WeatherService, GoogleGeocodeService) {
    // First define the methods and weather
    $scope.getWeather = getWeather;
    $scope.getWeatherAddress = getWeatherAddress;
    $scope.weather = WeatherService.weatherData;
    // $scope.log = log;

    $scope.$watch(function() {
      // This watches for changes in weatherData object in WeatherService
      return WeatherService.weatherData;
    }, function(newVal, oldVal) {
      // and passes the weatherData and lat and lon back to the DOM
      $scope.weather = WeatherService.weatherData;
      $scope.latitude = WeatherService.lat;
      $scope.longitude = WeatherService.lon;
    });
    $scope.$watch(function() {
      // This watches for changes in the coordinates in GoogleGeocodeService
      return GoogleGeocodeService.coordinates;
    }, function(newVal, oldVal) {
      // and passes the addres and coordinates to the DOM
      $scope.address = GoogleGeocodeService.address;
      $scope.coordinates = GoogleGeocodeService.coordinates;
    });

    function getWeather(lat, lon) {
      // This calls the geocode service with the lat and lon to get the address
      $scope.address = GoogleGeocodeService.getAddress(lat, lon)
        .then(function(response) {
          // then pass the address to the DOM and call getWeather with the lat and lon
          $scope.address = GoogleGeocodeService.address;
          WeatherService.getWeather(lat, lon);
        });
    }
    function getWeatherAddress(userAddress) {
      // This calls the geocode service with the address to get the lat and lon
      $scope.coordinates = GoogleGeocodeService.getCoordinates(userAddress)
        .then(function(response) {
          // then pass the coordinates to the DOM and call getWeather with them
          $scope.coordinates = GoogleGeocodeService.coordinates;
          WeatherService.getWeather(GoogleGeocodeService.coordinates.lat, GoogleGeocodeService.coordinates.lng);
        });
    }
    //  console.log(WeatherService.weatherData);
    // function log() {
    //   console.log(WeatherService.weatherData.currently.windBearing);
    // }
  }
}());
