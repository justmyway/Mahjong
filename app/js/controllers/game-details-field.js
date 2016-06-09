angular.module('Mahjong.controllers')
    .controller('gameDetailsPlayingFieldController',
        function($rootScope, $scope, $state, $cookies, $window, tiles, Games, GameTiles, TileProccessing) {

            $rootScope.loadingText = "Game wordt opgehaalt";
            TileProccessing.setGameTiles(tiles.Tiles);
            $scope.tiles = tiles;

            $scope.clickTile = function(tile) {

                if ($rootScope.gameDetails.state == 'finished') {

                    $window.alert("Er zijn geen matches meer mogelijk!");

                } else if ($cookies.get('user') == undefined) {

                    $window.alert("Je bent niet ingelocht!");

                } else if (TileProccessing.accessableTile(tile)) {

                    TileProccessing.checkMatchTile(tile,
                        function(tile1, tile2) {

                            TileProccessing.clearSelected();

                            $scope.tiles.Tiles[$scope.tiles.Tiles.indexOf(tile1)]['match'] = 'true';
                            $scope.tiles.Tiles[$scope.tiles.Tiles.indexOf(tile2)]['match'] = 'true';

                            TileProccessing.setGameTiles($scope.tiles.Tiles);

                            GameTiles.match({
                                    id: $rootScope.gameDetails._id,
                                    tile1Id: tile1._id,
                                    tile2Id: tile2._id
                                },
                                function() {
                                    GameTiles.matched({
                                        id: $rootScope.gameDetails._id
                                    }, function(tiles) {
                                        angular.forEach(tiles, function(matchedTile) {
                                            angular.forEach($scope.tiles.Tiles, function(gameTile) {
                                                if (matchedTile._id == gameTile._id && $scope.tiles.Tiles[$scope.tiles.Tiles.indexOf(gameTile)]['match'] == undefined)
                                                    $scope.tiles.Tiles[$scope.tiles.Tiles.indexOf(gameTile)]['match'] = 'true';
                                            });
                                        });
                                        TileProccessing.setGameTiles($scope.tiles.Tiles);
                                        Games.get({
                                            id: $rootScope.gameDetails._id
                                        }, function(game) {
                                            $rootScope.gameDetails = game;
                                        });
                                    }, function(error) {
                                        console.log('Error ', error);
                                    });
                                },
                                function(error) {
                                    GameTiles.matched({
                                        id: $rootScope.gameDetails._id
                                    }, function(tiles) {
                                        angular.forEach(tiles, function(matchedTile) {
                                            angular.forEach($scope.tiles.Tiles, function(gameTile) {
                                                if (matchedTile._id == gameTile._id && $scope.tiles.Tiles[$scope.tiles.Tiles.indexOf(gameTile)]['match'] == undefined)
                                                    $scope.tiles.Tiles[$scope.tiles.Tiles.indexOf(gameTile)]['match'] = 'true';
                                            });
                                        });
                                        TileProccessing.setGameTiles($scope.tiles.Tiles);
                                        Games.get({
                                            id: $rootScope.gameDetails._id
                                        }, function(game) {
                                            $rootScope.gameDetails = game;
                                        });
                                    }, function(error) {
                                        console.log('Error ', error);
                                    });
                                    console.log('Error ', error);
                                });

                        });
                }
            }

            $scope.clearSelected = function() {
                TileProccessing.clearSelected();
            }

            $scope.activeTile = function(tileId) {
                return TileProccessing.selectedTileId() == tileId;
            }
        });