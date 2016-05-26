angular.module('Mahjong.controllers')
    .controller('gameDetailsMatchTilesController',
        function($rootScope, $scope, matchedTiles) {

            // All participants
            $scope.participants = $rootScope.gameDetails.players;

            // Game started yet
            if (matchedTiles.Error) {
                $scope.gameStartedError = matchedTiles.Error;
            } else {

                var matches = {};
                var allMatchedTiles = matchedTiles.Tiles;

                // All matched tiles
                angular.forEach($rootScope.gameDetails.players, function(player) {
                    matches[player._id] = player;
                    matches[player._id]['matches'] = {};
                });

                angular.forEach(allMatchedTiles, function(tile) {
                    if (matches[tile.match.foundBy]['matches'][tile.match.otherTileId] == undefined) {
                        matches[tile.match.foundBy]['matches'][tile._id] = tile;
                    }
                });

                $scope.matchedByPlayer = matches;
            }

        });