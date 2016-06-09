describe("Factory", function() {
    var $httpBackend,
        $controller;

    // initialize the app
    beforeEach(module('Mahjong'));

    beforeEach(inject(function(_$httpBackend_, _$controller_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;

        $httpBackend.whenGET("js/views/game-list.html").respond(200, '');
        $httpBackend
            .when('GET', 'http://mahjongmayhem.herokuapp.com/Games?pageSize=500')
            .respond(201, [{
                "_id": "57552e1875c3971100c2ba1f",
                "createdBy": {
                    "_id": "q.vanhaastrecht@student.avans.nl",
                    "name": "Quinn van Haastrecht",
                    "__v": 0
                },
                "createdOn": "2016-06-06T08:02:32.758Z",
                "gameTemplate": {
                    "_id": "Ox",
                    "__v": 0,
                    "id": "Ox"
                },
                "__v": 0,
                "startedOn": "2016-06-06T08:02:50.029Z",
                "players": [{
                    "_id": "q.vanhaastrecht@student.avans.nl",
                    "name": "Quinn van Haastrecht",
                    "__v": 0
                }],
                "maxPlayers": 2,
                "minPlayers": 1,
                "state": "playing",
                "id": "57552e1875c3971100c2ba1f"
            }, {
                "_id": "575529bd75c3971100c2b98e",
                "createdBy": {
                    "_id": "nc.snakenborg@student.avans.nl",
                    "name": "Niels Snakenborg",
                    "__v": 0
                },
                "createdOn": "2016-06-06T07:43:57.214Z",
                "gameTemplate": {
                    "_id": "Shanghai",
                    "__v": 0,
                    "id": "Shanghai"
                },
                "__v": 1,
                "players": [{
                    "_id": "nc.snakenborg@student.avans.nl",
                    "name": "Niels Snakenborg",
                    "__v": 0
                }, {
                    "_id": "aw.vanzijderveld@student.avans.nl",
                    "name": "Iwan van Zijderveld",
                    "__v": 0
                }],
                "maxPlayers": 2,
                "minPlayers": 1,
                "state": "open",
                "id": "575529bd75c3971100c2b98e"
            }, {
                "_id": "5754a75ce9e6d4110083bebd",
                "createdBy": {
                    "_id": "bp.vanderzee@student.avans.nl",
                    "name": "Bram van der Zee",
                    "__v": 0
                },
                "createdOn": "2016-06-05T22:27:40.219Z",
                "gameTemplate": {
                    "_id": "Ox",
                    "__v": 0,
                    "id": "Ox"
                },
                "__v": 1,
                "startedOn": "2016-06-05T22:27:52.866Z",
                "players": [{
                    "_id": "bp.vanderzee@student.avans.nl",
                    "name": "Bram van der Zee",
                    "__v": 0
                }, {
                    "_id": "jlm.vantartwijk@student.avans.nl",
                    "name": "Jelte van Tartwijk",
                    "__v": 0
                }],
                "maxPlayers": 4,
                "minPlayers": 2,
                "state": "playing",
                "id": "5754a75ce9e6d4110083bebd"
            }]);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.resetExpectations();
    });

    it('correct game request', function() {
        // Given
        var $rootScope = {};
        var $scope = {};
        var expectedError = '';

        var gameListController = $controller('gameListController', {
            $rootScope: $rootScope,
            $scope: $scope
        });

        var newGame = {
            minPlayers: 1,
            maxPlayers: 2,
            templateName: "Ox"
        };

        $httpBackend
            .expectPOST('http://mahjongmayhem.herokuapp.com/Games')
            .respond(404, {
                err: expectedError
            });

        $scope.addNewGame(newGame);
        $httpBackend.flush();

        expect($rootScope.message.text[0]).to.equal('Helaas het russisch sensuur heeft deze call tegen gehouden.');
    });

    it('geen spel meegegeven', function() {
        // Given
        var $rootScope = {};
        var $scope = {};
        var expectedError = '';

        var gameListController = $controller('gameListController', {
            $rootScope: $rootScope,
            $scope: $scope
        });

        var newGame = {};

        $scope.addNewGame(newGame);
        $httpBackend.flush();

        expect($rootScope.message.text[0]).to.equal('Graag alle velden invullen!');
    });

    it('minimale spelers groter dan maximale', function() {
        // Given
        var $rootScope = {};
        var $scope = {};
        var expectedError = '';

        var gameListController = $controller('gameListController', {
            $rootScope: $rootScope,
            $scope: $scope
        });

        var newGame = {
            minPlayers: 4,
            maxPlayers: 2,
            templateName: "Ox"
        };

        $scope.addNewGame(newGame);
        $httpBackend.flush();

        expect($rootScope.message.text[0]).to.equal('Minimaal en maximaal door elkaar gehaald? ;)');
    });

    it('te veel spelers', function() {
        // Given
        var $rootScope = {};
        var $scope = {};
        var expectedError = '';

        var gameListController = $controller('gameListController', {
            $rootScope: $rootScope,
            $scope: $scope
        });

        var newGame = {
            minPlayers: 1,
            maxPlayers: 33,
            templateName: "Ox"
        };

        // $httpBackend
        //     .expectPOST('http://mahjongmayhem.herokuapp.com/Games')
        //     .respond(404, {
        //         err: expectedError
        //     });

        $scope.addNewGame(newGame);
        $httpBackend.flush();

        expect($rootScope.message.text[0]).to.equal('Het maximaal aantal spelers moet tussen de 3 en 32 personen liggen.');
    });
});