angular.module('Mahjong.controllers')
    .controller('gameDetailsPlayingFieldController',
        function($rootScope, $scope, $state, $window, tiles, TileProccessing) {

            TileProccessing.setGameTiles(tiles);
            $scope.tiles = tiles;

            $scope.clickTile = function(tile) {

                if ($rootScope.gameDetails.state == 'finished') {

                    $window.alert("Er zijn geen zetten meer mogelijk!");

                } else if (TileProccessing.accessableTile(tile)) {

                    TileProccessing.checkMatchTile(tile,
                        function(tile1, tile2) {

                            // console.log('match!    ' + tile1.tile.name + ':' + tile2.tile.name + '   +    ' + tile1.tile.suit + ':' + tile2.tile.suit);
                            $state.reload();

                        }, function(error) {
                            console.log('Error ', error);
                        });
                }
            }

            $scope.activeTile = function(tileId) {
                return TileProccessing.selectedTileId() == tileId;
            }
        });