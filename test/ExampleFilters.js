describe("Example Filters", function() {
	var reverseFilter;

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
	beforeEach(inject(function(_reverseFilter_){
		reverseFilter = _reverseFilter_;
	}));

	it('should reverse my text', function(done){
		// Filters zijn het gemakkelijkst te testen omdat ze jouw zelf gemaakte functie returnen.
		var result = reverseFilter('Reverse this');
		expect(result).to.equal('siht esreveR');

		done();
	});

	it('should not capitalize my reverse my text', function(done){
		// Filters zijn het gemakkelijkst te testen omdat ze jouw zelf gemaakte functie returnen.
		var result = reverseFilter('Reverse this', false);
		expect(result).to.equal('siht esreveR');

		done();
	});

	it('should capitalize my reverse my text', function(done){
		// Filters zijn het gemakkelijkst te testen omdat ze jouw zelf gemaakte functie returnen.
		var result = reverseFilter('Reverse this', true);
		expect(result).to.equal('SIHT ESREVER');

		done();
	});

});