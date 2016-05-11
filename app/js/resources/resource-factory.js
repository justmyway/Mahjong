angular.module('Mahjong.resources', ['ngResource'])

.factory('Games', function($resource, Settings) {
    return $resource(Settings.apiUri + 'Games/:id', {}, {
        'newGame': {
            method: 'POST',
            url: Settings.apiUri + 'Games',
            transformRequest: function(data) {
                data = JSON.stringify(data);
                data = data.substring(11, data.length - 1);
                return data;
            }
        },
        'start': {
            method: 'POST',
            url: Settings.apiUri + 'Games/:id/Start',
            params: {
                id: '@id'
            }
        }
    });
})