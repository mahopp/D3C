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


        $scope.craftTarget = {
            icon: {gemCategory:'amethyst',gemTyp:'flawless-royal'},
            name: ' ',
            tooltipUrl: 'http://us.battle.net/d3/en/artisan/jeweler/recipe/flawless-royal-amethyst'
        };
        $scope.craftSource = {
            icon: {gemCategory:'amethyst',gemTyp:'marquise'},
            name: 'Gem Upgrade Chance',
            tooltipUrl: 'http://us.battle.net/d3/en/artisan/jeweler/recipe/marquise-amethyst'
        };
        $scope.additionalGems = [
            {
                icon: {gemCategory:'amethyst',gemTyp:'royal'},
                name: 'Gem Upgrade Chance',
                tooltipUrl: 'http://us.battle.net/d3/en/artisan/jeweler/recipe/royal-amethyst'
            },
            {
                icon: {gemCategory:'amethyst',gemTyp:'flawless-imperial'},
                name: 'Gem Upgrade Chance',
                tooltipUrl: 'http://us.battle.net/d3/en/artisan/jeweler/recipe/flawless-imperial-amethyst'
            },
            {
                icon: {gemCategory:'amethyst',gemTyp:'imperial'},
                name: 'Gem Upgrade Chance',
                tooltipUrl: 'http://us.battle.net/d3/en/artisan/jeweler/recipe/imperial-amethyst'
            }
        ];

        $scope.showGridBottomSheet = function($event,gemData) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'templates/bottom-sheet-gems-to-choose.tpl.html',
                controller: 'BottomSheetGemsToChooseCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                if (clickedItem.choosen.icon != gemData.icon){

                    gemData.icon = clickedItem.choosen.icon;
                }

                console.log(clickedItem.collection);


                for (var x=0;x<clickedItem.collection.length;x++){
                    console.log(clickedItem.collection[x].icon.gemTyp);
                    console.log($scope.craftTarget.icon.gemTyp);

                    if (clickedItem.collection[x].icon.gemTyp == $scope.craftTarget.icon.gemTyp){var craftTargetIndex = x;}
                }
                for (var j=0;j<clickedItem.collection.length;j++){
                    if (clickedItem.collection[j].icon.gemTyp == $scope.craftSource.icon.gemTyp){var craftSourceIndex = j;}
                }
                /*var craftTargetIndex = clickedItem.collection.indexOf($scope.craftTarget);
                 var craftSourceIndex = clickedItem.collection.indexOf($scope.craftSource);*/


                if (craftTargetIndex > craftSourceIndex){
                    console.log(craftTargetIndex);
                    console.log(craftSourceIndex);
                    var new_additionalGems = [];


                    for (var i=craftSourceIndex+1;i<craftTargetIndex;i++){
                        console.log(clickedItem.collection[i]);
                        new_additionalGems.push(clickedItem.collection[i]);
                    }
                    console.log(new_additionalGems);
                }

                $scope.additionalGems = new_additionalGems;


                console.log(clickedItem.collection);
                console.log(gemData);
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



        $scope.gemsToChoose = [
        {
            icon: {gemCategory:'amethyst',gemTyp:'marquise'},
            name: 'Gem Upgrade Chance',
            tooltipUrl: 'http://us.battle.net/d3/en/artisan/jeweler/recipe/marquise-amethyst'
        },
        {
            icon: {gemCategory:'amethyst',gemTyp:'imperial'},
            name: 'Gem Upgrade Chance',
            tooltipUrl: 'http://us.battle.net/d3/en/artisan/jeweler/recipe/imperial-amethyst'
        },
        {
            icon: {gemCategory:'amethyst',gemTyp:'flawless-imperial'},
            name: 'Gem Upgrade Chance',
            tooltipUrl: 'http://us.battle.net/d3/en/artisan/jeweler/recipe/flawless-imperial-amethyst'
        },
        {
            icon: {gemCategory:'amethyst',gemTyp:'royal'},
            name: 'Gem Upgrade Chance',
            tooltipUrl: 'http://us.battle.net/d3/en/artisan/jeweler/recipe/royal-amethyst'
        },
        {
            icon: {gemCategory:'amethyst',gemTyp:'flawless-royal'},
            name: 'Gem Upgrade Chance',
            tooltipUrl: 'http://us.battle.net/d3/en/artisan/jeweler/recipe/flawless-royal-amethyst'

        }

        ];


        $scope.listItemClick = function($index) {
            var clickedItem = {
                choosen:$scope.gemsToChoose[$index],
                collection:$scope.gemsToChoose
            };
            $mdBottomSheet.hide(clickedItem);
        };
    });