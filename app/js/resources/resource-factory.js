angular.module('Mahjong.resources', ['ngResource'])

.factory('Games', function($resource, Settings) {
    return $resource(Settings.apiUrl + 'Games/:id', {}, {
        'newGame': {
            method: 'POST',
            url: Settings.apiUrl + 'Games',
            transformRequest: function(data) {
                data = JSON.stringify(data);
                data = data.substring(8, data.length - 1);
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

.factory('GamePlayers', function($resource, Settings) {
    return $resource(Settings.apiUrl + 'Games/:id/Players', {id:'@id'});
})

.factory('GameTiles', function($resource, Settings) {
    return $resource(Settings.apiUrl + 'Games/:id/Tiles', {}, {
        'matched': {
            method: 'GET',
            isArray: true,
            params: {
                'id': '@id',
                'matched': 'true'
            }
        },
        'unMatched': {
            method: 'GET',
            isArray: true,
            params: {
                'id': '@id',
                'matched': 'false'
            }
        },
        'match': {
            method: 'POST',
            url: Settings.apiUrl + 'Games/:id/Tiles/matches',
            isArray: true,
            params: {
                'id': '@id',
            },
            transformRequest: function(tiles) {
                var data = {};
                data.tile1Id = tiles.tile1Id;
                data.tile2Id = tiles.tile2Id;
                data = angular.toJson(data, false);
                return data;
            }
        }
    });
})