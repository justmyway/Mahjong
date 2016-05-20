angular.module('Mahjong.controllers')
    .controller('gameDetailController', function($rootScope, $scope, $routeParams, Games, GamePlayers, GameTiles, Settings, TileProccessing) {

        $scope.gameDetails = null;
        $scope.gameTiles = null;

        $rootScope.loading = true;
        $rootScope.loadingText = 'Het spel wordt met "warp speed" binnen gehaald. Een moment geduld a.u.b.';

        /*$scope.gameDetail = function(gameId) {

            Games.get({
                id: gameId
            }, function(response) {
                $scope.gameDetails = response;
                if (response.state == 'playing')
                    $scope.gameTile(gameId);

                $rootScope.loading = false;
            }, function(error) {
                console.log('Error', error);
            });
        }

        $scope.gameTile = function(gameId) {

            GameTiles.available({
                id: gameId
            }, function(response) {
                TileProccessing.setGameTiles(response);
                $scope.gameTiles = response;
            }, function(error) {
                console.log('Error', error);
            });
        }

        $scope.gameDetail($routeParams.gameId);

        $scope.anticepateGame = function(gameId) {

            GamePlayers.save({
                id: gameId
            }, function(response) {
                $scope.gameDetail(gameId);
            }, function(error) {
                console.log('Error', error);
                $scope.gameDetail(gameId);
            });
        }

        $scope.startGame = function(gameId) {

            Games.start({
                id: gameId
            }, function(response) {
                $scope.gameDetail(gameId);
            }, function(error) {
                console.log(error);
            });
        }

        $scope.checkTile = function(tile) {

            if (TileProccessing.accessableTile(tile) == true) {

                TileProccessing.checkMatchTile({
                    tile: tile
                }, function(tile1, tile2) {

                    GameTiles.match({
                            id: $routeParams.gameId,
                            tile1: tile1,
                            tile2: tile2
                        },
                        function() {
                            $scope.gameTile($routeParams.gameId);
                        }, function(error) {
                            $scope.gameTile($routeParams.gameId);
                            console.log('Error', error);
                        });

                }, function(error) {
                    $scope.gameTile($routeParams.gameId);
                    console.log('Error', error);
                });

            }
        }

        $scope.activeTile = function(tileId) {
            return TileProccessing.currentTileId() == tileId;
        }*/
    });