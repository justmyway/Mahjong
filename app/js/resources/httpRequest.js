angular.module('Mahjong.httpRequest', [])

.factory('httpRequestInterceptor', function($cookies) {
    return {
        request: function(config) {

            config.headers = {
                'x-username': $cookies.get('user'),
                'x-token': $cookies.get('token'),
                'content-type': 'Application/json'
            }

            return config;
        }
    };
})