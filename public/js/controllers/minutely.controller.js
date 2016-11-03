(function() {
  angular.module('forecast-app')
        .controller('MinutelyController', MinutelyController);

  MinutelyController.$inject = ['$scope', 'WeatherService'];

  function MinutelyController($scope, WeatherService) {
    $scope.weather = WeatherService.data;
    $scope.$watch(function() {
      return WeatherService.weatherData;
    }, function(newVal, oldVal) {
      $scope.weather = WeatherService.weatherData;
    });
  }
}());
