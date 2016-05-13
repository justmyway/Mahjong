angular.module('Mahjong.controllers')
.controller('userLogin', function($location, Settings) {
    $location.path(Settings.apiCallbackUri);
})

.controller('userLogout', function($location, Settings, $cookies, $http) {
    $cookies.remove('user');
    $cookies.remove('token');
    $location.path('/#/');
})

.controller('userCallback', function($location, $routeParams, $cookies, $http) {
    $cookies.put('user', $routeParams.username);
    $cookies.put('token', $routeParams.token);
    $location.path('/#/games');
})