require('angular/angular');
require('angular-route/angular-route');
require('angular-resource/angular-resource');
require('angular-cookies/angular-cookies');


require('./controllers/controllers.js');


require('./services/settings.js');
require('./resources/httpRequest.js');
require('./resources/resource-factory.js');

// Create your app
var app = angular.module('Mahjong', ['ngResource', 'ngRoute', 'ngCookies', 'Mahjong.controllers', 'Mahjong.httpRequest', 'Mahjong.resources', 'Mahjong.services']);

app.run(
	function($cookies, $rootScope){

		$rootScope.isLogedIn = function() {
            return $cookies.get('user') != null;
        };

    }
);

app.config(['$routeProvider'/*, '$httpProvider'*/,

    function($routeProvider/*, $httpProvider*/) {
        $routeProvider.
        when('/games', {
            templateUrl: 'js/views/game-list.html',
            controller: 'GameListController'
        })./*
        when('/games/:gameId', {
            templateUrl: 'js/views/game-specific.html',
            controller: 'gameDetailController'
        }).*/
        when('/login', {
            templateUrl: 'js/views/user-login.html',
            controller: 'userLogin'
        }).
        when('/logout', {
            templateUrl: 'js/views/user-logout.html',
            controller: 'userLogout'
        })/*.
        when('/authcallback', {
            templateUrl: 'js/views/user-authcallback.html',
            controller: 'userCallback'
        }).otherwise({
            redirectTo: '/games'
        })*/;
        //$httpProvider.interceptors.push('httpRequestInterceptor');
    }
]);