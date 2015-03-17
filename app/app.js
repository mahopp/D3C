'use strict';

// Declare app level module which depends on views, and components
var d3c_module = angular.module('D3C_0.1', [
    'ngRoute',
    'charCrusaderView',
    'charBarbView',
    'gemCraftView',
    'ngMaterial',
    'myApp.view2',
    'myApp.version'
])
    .filter('to_trusted', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    })

    .controller('MainViewCtrl', function ($rootScope, $scope, $timeout, $mdSidenav, $log, $mdBottomSheet,$http) {

        $scope.generalCalcTabViewUrl="views/calcTabs/generalCalcTab.html";

        $scope.toggleLeftSidebar = function () {
            $mdSidenav('left').toggle()
                .then(function () {
                    $log.debug("toggle left is done");
                });
        };
        $scope.toggleRightSidebar = function () {
            $mdSidenav('right').toggle()
                .then(function () {
                    $log.debug("toggle RIGHT is done");
                });
        };

        console.log(D3API);
        D3API.setServer('eu');
        D3API.setLocale('de_DE');
        D3API.getCareer({
            battletagName: 'Lanzdance',
            battletagCode: '2761',
            success: function (data) {
                console.log(data);
                D3API.getHero({
                    battletagName: 'Lanzdance',
                    battletagCode: '2761',
                    heroId: data.heroes[0].id,
                    success: function(data){console.log(data)}

                });

            }

        });

        D3API.getItem({
            item: 'CokBCOTjv4kPEgcIBBXEFj-7HRtdz0QdgGZcRh2cBgDLHcCullEdyvq8oDCLHjjoAkAAUBJYBGDoAmorCgwIABCE0I2xgYCAoBESGwidqYefDBIHCAQVI5aumDCPEjgAQAFYBJABAoABRo0BSpuSvaUBnAYAy60Bnk-D3LUBDyJX6rgBpsfS7A3AAS4Y96SHzAhQAFgC',
            success: function(data){console.log(data);}
        });







    })

    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log, $location) {



        $scope.selectedChar = {};

        $scope.charData = [{
            id: "chars:barb",
            title: 'Barbar',
            url: 'chars/barb',
            value: 'avatar-1'
        }, {
            id: "chars:crus",
            title: 'Crusader',
            url: 'chars/crusader',
            value: 'avatar-2'
        }, {
            id: "chars:dh",
            title: 'Deamon Hunter',
            url: 'chars/dh',
            value: 'avatar-3'
        }, {
            id: "chars:monk",
            title: 'Monk',
            url: 'chars/monk',
            value: 'avatar-4'
        }, {
            id: "chars:wd",
            title: 'Witch Doctor',
            url: 'chars/wd',
            value: 'avatar-5'
        }, {
            id: "chars:wiz",
            title: 'Wizard',
            url: 'chars/wiz',
            value: 'avatar-6'
        }];


        $scope.changeViewTo = function(char){
            $scope.selectedChar = char;
            $location.path(char.url).replace();


        };

        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };
    })
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log, $location) {

        $scope.rightSidebarElements = [
            {
                icon : 'image:ic_flare_24px',
                name: 'Gem Craft',
                url: 'additCalcs/gemCraft'

            }
        ];

        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };


        $scope.changeViewTo = function(ele){
            $scope.selectedChar = ele;
            $location.path(ele.url).replace();


        };

    })



    .config(['$mdThemingProvider','$routeProvider', '$mdIconProvider', function ($mdThemingProvider,$routeProvider, $mdIconProvider) {
        $mdThemingProvider.theme('default')

            .primaryPalette('grey')
            .accentPalette('deep-orange')
            .backgroundPalette('grey')
            .warnPalette('grey');



        $routeProvider.otherwise({redirectTo: '/view1'});
        $mdIconProvider
            .iconSet('action', 'img/icons/sets/svg-sprite-action.svg', 24)
            .iconSet('alert', 'img/icons/sets/svg-sprite-alert.svg', 24)
            .iconSet('av', 'img/icons/sets/svg-sprite-av.svg', 24)
            .iconSet('communication', 'img/icons/sets/svg-sprite-communication.svg', 24)
            .iconSet('content', 'img/icons/sets/svg-sprite-content.svg', 24)
            .iconSet('device', 'img/icons/sets/svg-sprite-device.svg', 24)
            .iconSet('editor', 'img/icons/sets/svg-sprite-editor.svg', 24)
            .iconSet('file', 'img/icons/sets/svg-sprite-file.svg', 24)
            .iconSet('hardware', 'img/icons/sets/svg-sprite-hardware.svg', 24)
            .iconSet('image', 'img/icons/sets/svg-sprite-image.svg', 24)
            .iconSet('maps', 'img/icons/sets/svg-sprite-maps.svg', 24)
            .iconSet('navigation', 'img/icons/sets/svg-sprite-navigation.svg', 24)
            .iconSet('notification', 'img/icons/sets/svg-sprite-notification.svg', 24)
            .iconSet('social', 'img/icons/sets/svg-sprite-social.svg', 24)
            .iconSet('toggle', 'img/icons/sets/svg-sprite-toggle.svg', 24)
            .icon('chars:barb', 'img/icons/custom/Icon_Barb.svg')
            .icon('chars:crus', 'img/icons/custom/Icon_Crusader.svg')
            .icon('chars:dh', 'img/icons/custom/Icon_Dh.svg')
            .icon('chars:monk', 'img/icons/custom/Icon_Monk.svg')
            .icon('chars:wd', 'img/icons/custom/Icon_Wd.svg')
            .icon('chars:wiz', 'img/icons/custom/Icon_Wizard.svg');

    }]);






