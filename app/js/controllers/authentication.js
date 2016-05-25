angular.module('Mahjong.controllers')
.controller('userLogin', function($location, Settings) {
    $location.path(Settings.apiCallbackUri);
})

.controller('userLogout', function($location, Settings, $cookies, $http) {
    $cookies.remove('user');
    $cookies.remove('token');
    $location.path('/#/');
})

.controller('userCallback', function($location, $cookies, $http, $state) {
    $cookies.put('user', $location.search()['username']);
    $cookies.put('token', $location.search()['token']);
    $state.go('games');
})