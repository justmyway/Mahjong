require('angular/angular');
//require('angular-route/angular-route');
require('angular-ui-router');
require('angular-resource/angular-resource');
require('angular-cookies/angular-cookies');


require('./controllers/controllers.js');


require('./services/settings.js');
require('./resources/httpRequest.js');
require('./resources/resource-factory.js');

// Create your app
var app = angular.module('Mahjong', ['ngResource', 'ui.router', 'ngCookies', 'Mahjong.controllers', 'Mahjong.httpRequest', 'Mahjong.resources', 'Mahjong.services']);

app.run(['$cookies', '$rootScope',
    function($cookies, $rootScope) {

        $rootScope.isLogedIn = function() {
            return $cookies.get('user') != null;
        };

        $rootScope.startableGame = function(specificGame) {
            if (specificGame.createdBy._id == $cookies.get('user')) {
                if (specificGame.players.length <= specificGame.maxPlayers && specificGame.players.length >= specificGame.minPlayers) {
                    return true;
                }
            }
            return false;
        }

    }
]);

app.config(function($stateProvider, $routeProvider, $httpProvider) {

        $routeProvider.otherwise("/games");

        $stateProvider
            .state('games', {
                url: "/games",
                templateUrl: 'js/views/game-list.html',
                controller: 'GameListController'
            })

        /*$routeProvider.
        when('/games', {
            templateUrl: 'js/views/game-list.html',
            controller: 'GameListController'
        }).
        when('/games/:gameId', {
            templateUrl: 'js/views/game-details.html',
            controller: 'gameDetailController'
        }).
        when('/login', {
            templateUrl: 'js/views/user-logedin.html',
            controller: 'userLogin'
        }).
        when('/logout', {
            templateUrl: 'js/views/user-logedout.html',
            controller: 'userLogout'
        }).
        when('/authcallback', {
            templateUrl: 'js/views/user-login-callback.html',
            controller: 'userCallback'
        }).otherwise({
            redirectTo: '/games'
        });
        $httpProvider.interceptors.push('httpRequestInterceptor');
    }*/
    );