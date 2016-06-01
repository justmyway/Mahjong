describe("Example Injection", function() {
	var $controller;
	var PersonService;

	/*
		We vragen hier de module op die we in de app.js gecreëerd hebben.
		Angular-mocks regelt voor ons dat alles geïnitialiseerd wordt.
	*/
	beforeEach(module('myApp'));

	/*
		We kunnen verchillende dingen van de app opvragen.
		Services, filters, directives, controllers, scopes, etc

		Angular-mocks gebruikt de inject functie hiervoor.

		We kunnen underscores voor en achter de providers zetten, angular weet dan nog steeds welke providers het zijn
	*/
	beforeEach(inject(function(_$controller_, _PersonService_){
		$controller = _$controller_;
		PersonService = _PersonService_;
	}));

	it('should replace the personService.persons', function(done){
		// Vervang persons door iets anders, hierdoor kunnen we dit testen
		PersonService.persons = [{ firstName: 'Test', lastName: 'De Tester'}];

		// Creëer een personController, geef de dependencies aan de constructor by name mee
		var personController = $controller('PersonController', { $scope: {}, PersonService: PersonService });

		// Deze roept onze service aan (verwachten we), dus nu kunnen we kijken of dit klopt
		var actualPersons = personController.getPersons();

		expect(actualPersons).to.be.an('array');
		expect(actualPersons).to.have.length(1);
		expect(actualPersons[0].firstName).to.equal('Test');
		expect(actualPersons[0].lastName).to.equal('De Tester');
		done();
	});
});