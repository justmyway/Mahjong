angular.module('Mahjong.controllers')
    .controller('gameListController', ['$rootScope', '$scope', 'Games', 'Settings',
        function($rootScope, $scope, Games, Settings) {

            $rootScope.loading = true;
            $rootScope.loadingText = "Games worden opgehaalt";
            $scope.games = null;
            $scope.gameTemplates = Settings.gameTemplates

            Games.query({
                pageSize: 500
            }, function(response) {
                console.log(response);
                $rootScope.loading = false;
                $rootScope.loadingText = "";
                $scope.games = response;
            }, function(error) {
                console.log("Error: " + error);
            });

            $scope.addNewGame = function(newGame) {

                $rootScope.message = [];
                $rootScope.message.text = [];

                var players = {
                    min: parseInt(newGame.minPlayers),
                    max: parseInt(newGame.maxPlayers)
                };

                if (newGame == undefined || newGame.templateName == null || newGame.minPlayers == null || newGame.maxPlayers == null) {
                    $rootScope.message.text.push('Graag alle velden invullen!');
                    $rootScope.message.perspective = 'error';
                    return false;
                }

                // bij het echt spelen deze waarde aanpassen naar 2 minimale spelers
                if (players.min < 1 || players.min > 31) {
                    $rootScope.message.text.push('Het minimaal aantal spelers moet tussen de 2 en 31 personen liggen.');
                    $rootScope.message.perspective = 'error';
                }

                if (players.max < 1 || players.max > 32) {
                    $rootScope.message.text.push('Het maximaal aantal spelers moet tussen de 3 en 32 personen liggen.');
                    $rootScope.message.perspective = 'error';
                }

                if (players.max < players.min) {
                    $rootScope.message.text.push('Minimaal en maximaal door elkaar gehaald? ;)');
                    $rootScope.message.perspective = 'error';
                }

                if ($rootScope.message.perspective == null) {

                    $rootScope.loading = true;
                    $rootScope.loadingText = 'Verzoek wordt verzonden. (dit kan even duren rusland is niet zo snel...)';

                    Games.newGame({
                            'Game': newGame
                        },
                        function(response) {
                            $rootScope.message.text.push('Het spel is aangemaakt! veel plezier met spelen');
                            $rootScope.message.perspective = 'success';

                            Games.query({}, function(response) {
                                $scope.games = response;
                                $rootScope.loading = false;
                            }, function(error) {
                                console.log(error);
                            });
                        },
                        function(error) {
                            $rootScope.message.text.push('Helaas het russisch sensuur heeft deze call tegen gehouden.');
                            $rootScope.message.perspective = 'error';
                            $rootScope.loading = false;
                        });
                }

            };

        }
    ]);