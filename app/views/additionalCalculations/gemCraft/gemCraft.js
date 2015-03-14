'use strict';

angular.module('gemCraftView', ['ngRoute','ngMaterial'])

.config(['$routeProvider','$mdThemingProvider', function($routeProvider,$mdThemingProvider) {
  $routeProvider.when('/additCalcs/gemCraft', {
    templateUrl: 'views/additionalCalculations/gemCraft/gemCraft.html',
    controller: 'gemCraftCtrl'
  });
    $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('deep-orange');

}])
    .controller('gemCraftCtrl', function ($scope, $log,$mdBottomSheet ) {


        $scope.showGridBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/bottom-sheet-gems-to-choose.tpl.html',
                controller: 'BottomSheetGemsToChooseCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };



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
    })

    .controller('BottomSheetGemsToChooseCtrl', function($scope, $mdBottomSheet) {

        $scope.gemsToChoose = [{
            icon: 'amethyst_flawless-royal',
            name: 'Gem Upgrade Chance',
            url: 'adCalc/gemUpgradeChance'

        }];


        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
    });