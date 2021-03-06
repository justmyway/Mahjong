angular.module('Mahjong.controllers')
    .controller('gameDetailsController', ['$rootScope', '$scope', '$timeout', 'singleGame', '$cookies', '$state', 'Games', 'GamePlayers',
        function($rootScope, $scope, $timeout, singleGame, $cookies, $state, Games, GamePlayers /*, GamePlayers, GameTiles, TileProccessing*/ ) {

            $rootScope.gameDetails = null;
            $scope.gameTiles = null;

            if (singleGame.Game == undefined) {
                $rootScope.loading = true;
                $rootScope.loadingText = 'Helaas kon het spel niet worden opgehaald';
            } else {
                $rootScope.gameDetails = singleGame.Game;
            }

            //helping functions

            $scope.userParticepating = function() {
                var participatingUsers = $rootScope.gameDetails.players;
                var currentUser = $cookies.get('user');
                for (var i = participatingUsers.length - 1; i >= 0; i--) {
                    if (participatingUsers[i]._id == currentUser) {
                        return true;
                    }
                };
                return false;
            }

            //view functions

            $rootScope.canAnticepateGame = function() {
                var game = $rootScope.gameDetails;

                if (game.state == "open") {
                    if (game.players.length < game.maxPlayers) {
                        if (!$scope.userParticepating()) {
                            return true;
                        }
                    }
                }
                return false;
            }

            $rootScope.canDeleteGame = function() {
                var game = $rootScope.gameDetails;

                if (game.state != "playing") {
                    if (game.createdBy._id == $cookies.get('user')) {
                        return true;
                    }
                }
                return false;
            }

            $scope.canBeginGame = function() {
                var game = $rootScope.gameDetails;
                if (game.createdBy._id == $cookies.get('user')) {
                    if (game.state == "open") {
                        if (game.players.length >= game.minPlayers) {
                            return true;
                        }
                    }
                }
                return false;
            }

            //view actions

            $scope.anticepateGame = function() {
                $rootScope.loading = true;
                $rootScope.loadingText = 'Verzoek tot deelnemen wordt verwerkt';

                GamePlayers.save({
                    id: $rootScope.gameDetails._id
                }, function(response) {
                    $rootScope.loading = false;
                    $state.reload();
                }, function(error) {
                    console.log('Error', error);
                    $rootScope.loadingText = 'Error: ' + error.statusText;
                    $timeout(function() {
                        $rootScope.loading = false;
                    }, 5500);
                });
            }

            $scope.deleteGame = function() {
                $rootScope.loading = true;
                $rootScope.loadingText = 'Verzoek om te verwijderen wordt verwerkt';

                Games.delete({
                    id: $rootScope.gameDetails._id
                }, function(response) {
                    $rootScope.loadingText = 'Game is verwijderd!!';
                    $timeout(function() {
                        $rootScope.loading = false;
                        $state.go('games');
                    }, 2500);
                }, function(error) {
                    console.log('Error', error);
                    $rootScope.loadingText = 'Error: ' + error.statusText;
                    $timeout(function() {
                        $rootScope.loading = false;
                    }, 5500);
                });
            }

            $scope.startGame = function() {
                $rootScope.loading = true;
                $rootScope.loadingText = 'Verzoek om te starten wordt verwerkt';

                Games.start({
                    id: $rootScope.gameDetails._id
                }, function(response) {
                    $rootScope.loading = false;
                    $state.reload();
                }, function(error) {
                    console.log('Error', error);
                    $rootScope.loadingText = 'Error: ' + error.statusText;
                    $timeout(function() {
                        $rootScope.loading = false;
                    }, 5500);
                });
            }
        }
    ]);