angular.module('Mahjong.controllers')
    .controller('gameListController', ['$rootScope', '$scope', 'Games', 'Settings',
        function($rootScope, $scope, Games, Settings) {

            $rootScope.loading = true;
            $scope.games = null;
            $scope.gameTemplates = Settings.gameTemplates

            Games.query({}, function(response) {
                $rootScope.loading = false;
                $scope.games = response;
            }, function(error) {
                console.log("Error: " + error);
            });

            $scope.addNewGame = function(newGame) {

                $rootScope.message = [];
                $rootScope.message.text = [];

                console.log(newGame);

                if (newGame == undefined || newGame.templateName == null || newGame.minPlayers == null || newGame.maxPlayers == null) {
                    $rootScope.message.text.push('Graag alle velden invullen!');
                    $rootScope.message.perspective = 'error';
                    return false;
                }

                // bij het echt spelen deze waarde aanpassen naar 2 minimale spelers
                if (newGame.minPlayers < 1 || newGame.minPlayers > 31) {
                    $rootScope.message.text.push('Het minimaal aantal spelers moet tussen de 2 en 31 personen liggen.');
                    $rootScope.message.perspective = 'error';
                }

                if (newGame.maxPlayers < 3 || newGame.maxPlayers > 32) {
                    $rootScope.message.text.push('Het maximaal aantal spelers moet tussen de 3 en 32 personen liggen.');
                    $rootScope.message.perspective = 'error';
                }

                if (newGame.maxPlayers < newGame.minPlayers) {
                    $rootScope.message.text.push('Minimaal en maximaal door elkaar gehaald? ;)');
                    $rootScope.message.perspective = 'error';
                }
                if ($rootScope.message.perspective == null) {

                    $rootScope.loading = true;
                    $rootScope.loadingText = 'Verzoek word verzonden. (dit kan even duren rusland is niet zo snel...)';

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