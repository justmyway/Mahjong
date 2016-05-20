angular.module('Mahjong.resources', ['ngResource'])

.factory('Games', function($resource, Settings) {
    return $resource(Settings.apiUrl + 'Games/:id', {}, {
        'newGame': {
            method: 'POST',
            url: Settings.apiUrl + 'Games',
            transformRequest: function(data) {
                data = JSON.stringify(data);
                data = data.substring(8, data.length - 1);
                console.log(data);
                return data;
            }
        },
        'start': {
            method: 'POST',
            url: Settings.apiUrl + 'Games/:id/Start',
            params: {
                id: '@id'
            }
        }
    });
})

.factory('GamePlayers', function($resource, Settings, $cookies) {
    return $resource(Settings.apiUri + 'Games/:id/Players');
})

.factory('GameTiles', function($resource, Settings) {
    return $resource(Settings.apiUri + 'Games/:id/Tiles', {}, {
        /*'available': {
            method: 'GET',
            isArray: true,
            params: {
                'id': '@id',
                'matched': 'false'
            }
        },
        'matched': {
            method: 'GET',
            isArray: true,
            params: {
                'id': '@id',
                'matched': 'true'
            }
        },*/
        'match': {
            method: 'POST',
            url: Settings.apiUri + 'Games/:id/Tiles/matches',
            isArray: true,
            params: {
                'id': '@id',
            },
            transformRequest: function(tiles) {
                var data = {};
                data.tile1Id = tiles.tile1;
                data.tile2Id = tiles.tile2;
                data = angular.toJson(data, false);
                return data;
            }
        }
    });
})