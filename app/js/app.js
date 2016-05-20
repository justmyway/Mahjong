require('angular/angular');
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

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

        $urlRouterProvider.otherwise("/games");

        $stateProvider
            .state('games', {
                url: '/games',
                templateUrl: 'js/views/game-list.html',
                controller: 'gameListController'
            })
            .state('games.single', {
                url: '/games/:gameId',
                templateUrl: 'js/views/game-details.html',
                controller: 'gameDetailController',
                resolve: {
                    singleGame: function($q){
                        var deferred = $q.defer();

                        Games.get({
                            id: gameId
                        }, function(game) {
                            console.log('game opgehaald');
                            deferred.resolve({'Error':'', 'Game': game});
                        }, function(error) {
                            console.log('Error', error);
                            deferred.resolve({'Error': error, 'Game': ''});
                        });

                        return deferred.promise;
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'js/views/user-logedin.html',
                controller: 'userLogin'
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'js/views/user-logedout.html',
                controller: 'userLogout'
            })
            .state('authcallback', {
                url: '/authcallback',
                templateUrl: 'js/views/user-login-callback.html',
                controller: 'userCallback'
            });

        $httpProvider.interceptors.push('httpRequestInterceptor');
    }
);