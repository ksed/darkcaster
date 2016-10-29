(function() {
  angular.module('forecast-app')
    .factory('WeatherService', WeatherService);

  WeatherService.$inject = ['$http'];

  function WeatherService($http) {
    var secretToken = {
      secret: 'my favorite month is october'
    };
    var latitude;
    var longitude;
    var weatherData = [];
    return {
      weatherData: weatherData,
      getWeather: getWeather
    };

    function getWeather(latitude, longitude) {
      var configHeader = {
        headers: secretToken
      };
      var url = '/forecast/' + latitude + ',' + longitude;
      return $http.get(url, configHeader);
    }
  }
}());
