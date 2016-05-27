angular.module('Mahjong.controllers')
    .controller('gameDetailsPlayingFieldController',
        function($rootScope, $scope, $state, $window, tiles, Games, GameTiles, TileProccessing) {

            TileProccessing.setGameTiles(tiles.Tiles);
            $scope.tiles = tiles;

            $scope.clickTile = function(tile) {

                if ($rootScope.gameDetails.state == 'finished') {

                    $window.alert("Er zijn geen matches meer mogelijk!");

                } else if (TileProccessing.accessableTile(tile)) {

                    TileProccessing.checkMatchTile(tile,
                        function(tile1, tile2) {

                            TileProccessing.clearSelected();

                            $scope.tiles.Tiles.splice($scope.tiles.Tiles.indexOf(tile1), 1);
                            $scope.tiles.Tiles.splice($scope.tiles.Tiles.indexOf(tile2), 1);

                            TileProccessing.setGameTiles($scope.tiles.Tiles);

                            GameTiles.match({
                                    id: $rootScope.gameDetails._id,
                                    tile1Id: tile1._id,
                                    tile2Id: tile2._id
                                },
                                function() {
                                    GameTiles.unMatched({
                                        id: $rootScope.gameDetails._id
                                    }, function(tiles) {
                                        if (tiles.length <= $scope.tiles.Tiles.length) {
                                            $scope.tiles.Tiles = tiles;
                                            TileProccessing.setGameTiles(tiles);
                                        }
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
                                    GameTiles.unMatched({
                                        id: $rootScope.gameDetails._id
                                    }, function(tiles) {
                                        $scope.tiles.Tiles = tiles;
                                        TileProccessing.setGameTiles(tiles);
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