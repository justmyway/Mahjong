require('angular/angular');
require('angular-ui-router');
require('angular-resource/angular-resource');
require('angular-cookies/angular-cookies');


require('./controllers/controllers.js');


require('./services/settings.js');
require('./resources/httpRequest.js');
require('./resources/resource-factory.js');
require('./resources/tileLogic.js');

// Create your app
var app = angular.module('Mahjong', ['ngResource', 'ui.router', 'ngCookies', 'Mahjong.controllers', 'Mahjong.httpRequest', 'Mahjong.resources', 'Mahjong.services', 'Mahjong.logic']);

app.run(['$cookies', '$rootScope',
    function($cookies, $rootScope) {

        $rootScope.isLogedIn = function() {
            return $cookies.get('user') != null;
        };
    }
]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/games");

    $stateProvider
        .state('games', {
            url: '/games',
            templateUrl: 'js/views/game-list.html',
            controller: 'gameListController'
        })
        .state('gameDetails', {
            url: '/games/:gameId',
            templateUrl: 'js/views/game-details.html',
            controller: 'gameDetailsController',
            resolve: {
                singleGame: function($stateParams, Games, $q) {

                    var deferred = $q.defer();

                    Games.get({
                        id: $stateParams.gameId
                    }, function(game) {
                        deferred.resolve({
                            'Error': undefined,
                            'Game': game
                        });
                    }, function(error) {
                        deferred.resolve({
                            'Error': error,
                            'Game': undefined
                        });
                    });

                    return deferred.promise;
                }
            }
        })
        .state('gameDetails.playingField', {
            url: '/playing-field',
            templateUrl: 'js/views/game-details-field.html',
            controller: 'gameDetailsPlayingFieldController',
            resolve: {
                tiles: function($stateParams, GameTiles, $q) {

                    var deferred = $q.defer();

                    GameTiles.unMatched({
                        id: $stateParams.gameId
                    }, function(tiles) {
                        deferred.resolve({
                            'Error': undefined,
                            'Tiles': tiles
                        });
                    }, function(error) {
                        deferred.resolve({
                            'Error': error,
                            'Tiles': undefined
                        });
                    });

                    return deferred.promise;
                }
            }
        })
        .state('gameDetails.matchedTiles', {
            url: '/matched-tiles',
            templateUrl: 'js/views/game-details-match-tiles.html',
            controller: 'gameDetailsMatchTilesController',
            resolve: {
                matchedTiles: function($stateParams, GameTiles, $q) {

                    var deferred = $q.defer();

                    GameTiles.matched({
                        id: $stateParams.gameId
                    }, function(tiles) {
                        deferred.resolve({
                            'Error': undefined,
                            'Tiles': tiles
                        });
                    }, function(error) {
                        deferred.resolve({
                            'Error': error,
                            'Tiles': undefined
                        });
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

    //$locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('httpRequestInterceptor');
});