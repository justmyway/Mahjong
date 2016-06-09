describe("Game tiles Directives", function() {
    var gameTile;
    var $compile;
    var $rootScope;

    /*
		We vragen hier de module op die we in de app.js gecreëerd hebben.
		Angular-mocks regelt voor ons dat alles geïnitialiseerd wordt.
	*/
    beforeEach(module('Mahjong'));

    // load the templates
    // We kunnen deze template laden doordat we gebruik maken van ng-html2js in de karma config.
    // Hierdoor kunnen we de html testen die er uitkomt.
    //beforeEach(module('js/views/game-details-field.html'));

    /*
		We kunnen verchillende dingen van de app opvragen.
		Services, filters, directives, controllers, scopes, etc

		Angular-mocks gebruikt de inject functie hiervoor.

		We kunnen underscores voor en achter de providers zetten, angular weet dan nog steeds welke providers het zijn
	*/
    beforeEach(inject(function( /*_$directive_ ,*/ _$compile_, _$rootScope_) {
        /*var directive = _$directive_;
        gameTile = directive('tile');*/
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('should render the gameTile directive', function() {
        // Maak een nieuwe scope die de properties bevat die we willen testen
        var $scope = $rootScope.$new();

        $scope.tile = {
            xPos: 7,
            yPos: 1,
            zPos: 0,
            tile: {
                _id: 76,
                suit: "Character",
                name: "2",
                matchesWholeSuit: false,
                __v: 0
            },
            _id: "5541fc5b1872631100678bb5"
        };

        var angularElement = angular.element('<tile data="tile" on-select="myFunctionWhenClickedOn"></tile>');
        var compiledElement = $compile(angularElement)($scope);

        $scope.$digest(); // The scope moet gedigest worden zodat alles aangeroepen wordt.


        // We kunnen de html opvragen en vergelijken met wat we verwachten.
        // In dit geval verwachten we dat de voor- en achternaam achter elkaar in een h3 staan.
        expect(compiledElement.html()).to.have.string('<div ng-class="activeTile(data._id) ? \'selectedTile\' : \'\'" class="tile" ng-click="clickTile(data)" xpos="7" ypos="1" zpos="0" name="2" suit="Character"></div>');
    });
});