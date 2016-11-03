(function() {
  angular.module('forecast-app')
        .controller('DailyController', DailyController);

  DailyController.$inject = ['$scope', 'WeatherService'];

  function DailyController($scope, WeatherService) {
    $scope.weather = WeatherService.data;
    $scope.$watch(function() {
      return WeatherService.weatherData;
    }, function(newVal, oldVal) {
      $scope.weather = WeatherService.weatherData;
    });
  }
}());
