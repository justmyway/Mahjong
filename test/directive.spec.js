describe("Example Directives", function() {
    var gameDetails;
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
    beforeEach(module('js/views/game-details-field.html'));

    /*
		We kunnen verchillende dingen van de app opvragen.
		Services, filters, directives, controllers, scopes, etc

		Angular-mocks gebruikt de inject functie hiervoor.

		We kunnen underscores voor en achter de providers zetten, angular weet dan nog steeds welke providers het zijn
	*/
    beforeEach(inject(function(_gameDetailsPlayingFieldController_, _$compile_, _$rootScope_) {
        gameDetails = _gameDetailsPlayingFieldController_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should render the person directive', function() {
        // Maak een nieuwe scope die de properties bevat die we willen testen
        var $scope = $rootScope.$new();
        $scope.item = {
            firstName: 'Martijn',
            lastName: 'Schuurmans'
        };
        $scope.myFunctionWhenClickedOn = function() {
            console.log('OnClick was called!');
        };

        // We maken onze string (die we gebruiken in templates om directives aan te duiden)
        // en compileren deze zodat de directive gecreëerd wordt.
        var element = $compile('<person person="item" on-select="myFunctionWhenClickedOn"></person>')($scope);
        $scope.$digest(); // The scope moet gedigest worden zodat alles aangeroepen wordt.

        // Vergelijk dit met JQuery, we kunnen zoeken in een element naar een <button>
        // We voeren dan de methode 'click' uit.
        element.find('button').triggerHandler('click');

        // We kunnen de html opvragen en vergelijken met wat we verwachten.
        // In dit geval verwachten we dat de voor- en achternaam achter elkaar in een h3 staan.
        expect(element.html()).to.have.string('<h3 class="ng-binding">Martijn Schuurmans</h3>');
    });
});