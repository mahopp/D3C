'use strict';

angular.module('charCrusaderView', ['ngRoute','ngMaterial'])

.config(['$routeProvider','$mdThemingProvider', function($routeProvider,$mdThemingProvider) {
  $routeProvider.when('/chars/crusader', {
    templateUrl: 'views/chars/crusader/charCrusaderView.html',
    controller: 'charCrusaderCtrl'
  });
    $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('deep-orange');

}])
    .controller('charCrusaderCtrl', function ($scope, $log) {






        $scope.data = {
            selectedIndex : 0,
            secondLocked : true,
            secondLabel : "Item Two"
        };
        $scope.next = function() {
            $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
        };
        $scope.previous = function() {
            $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
        };
    });