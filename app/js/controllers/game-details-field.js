angular.module('Mahjong.controllers')
    .controller('gameDetailsPlayingFieldController', 
    	function($rootScope, $scope, $state, tiles, TileProccessing){
    	
    	TileProccessing.setGameTiles(tiles);
    	$scope.tiles = tiles;

    	$scope.clickTile = function(tile) {

            if (TileProccessing.accessableTile(tile)) {

                TileProccessing.checkMatchTile(tile, 
                	function(tile1Id, tile2Id) {

                    GameTiles.match({
                            id: $rootScope.gameDetails._id,
                            tile1Id: tile1Id,
                            tile2Id: tile2Id
                        },
                        function() {
                            $state.reload();
                        }, function(error) {
                            console.log('Error ', error);
                        });

                }, function(error) {
                    console.log('Error ', error);
                });
            }
        }

        $scope.activeTile = function(tileId) {
            return TileProccessing.selectedTileId() == tileId;
        }
    });