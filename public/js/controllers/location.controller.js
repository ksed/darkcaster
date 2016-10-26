(function() {
  angular.module('forecast-app')
    .controller('LocationController', LocationController);

  LocationController.$inject = ['$scope'];

  function LocationController($scope) {
    $scope.submitLocation = submitLocation;

    function submitLocation(lat, lon) {
      console.log(lat, lon);
    }
  }
}());
