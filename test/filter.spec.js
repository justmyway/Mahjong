describe("Filters", function() {
	var Filter;

	/*
		We vragen hier de module op die we in de app.js gecreëerd hebben.
		Angular-mocks regelt voor ons dat alles geïnitialiseerd wordt.
	*/
	beforeEach(module('Mahjong'));

	/*
		We kunnen verchillende dingen van de app opvragen.
		Services, filters, directives, controllers, scopes, etc

		Angular-mocks gebruikt de inject functie hiervoor.

		We kunnen underscores voor en achter de providers zetten, angular weet dan nog steeds welke providers het zijn
	*/
	beforeEach(inject(function($filter){
		Filter = $filter;
	}));

	it('has a matched filter', inject(function($filter) {
        expect($filter('unmatchedtile')).not.to.equal(null);
    }));

	// 5 objecten
	// 3 niet gematched 2 wel
	var TestTiles = [{"xPos":19,"yPos":7,"zPos":2,"tile":{"_id":5,"suit":"Circle","name":"2","matchesWholeSuit":false,"__v":0,"id":"5"},"_id":"574460e060e5431100d7b236","match":{"foundBy":"m.vandeven4@student.avans.nl","otherTileId":"574460e060e5431100d7b1e0","foundOn":"2016-05-26T10:38:51.581Z"}},{"xPos":3,"yPos":9,"zPos":0,"tile":{"_id":7,"suit":"Circle","name":"2","matchesWholeSuit":false,"__v":0,"id":"7"},"_id":"574460e060e5431100d7b1e0","match":{"foundBy":"m.vandeven4@student.avans.nl","otherTileId":"574460e060e5431100d7b236","foundOn":"2016-05-26T10:38:51.581Z"}},{"xPos":19,"yPos":7,"zPos":3,"tile":{"_id":140,"suit":"Flower","name":"Plum","matchesWholeSuit":true,"__v":0,"id":"140"},"_id":"574460e060e5431100d7b246","match":{"foundBy":"m.vandeven4@student.avans.nl","otherTileId":"574460e060e5431100d7b1ee","foundOn":"2016-05-26T10:33:46.355Z"}},{"xPos":9,"yPos":11,"zPos":0,"tile":{"_id":142,"suit":"Flower","name":"Chrysantememum","matchesWholeSuit":true,"__v":0,"id":"142"},"_id":"574460e060e5431100d7b1ee","match":{"foundBy":"m.vandeven4@student.avans.nl","otherTileId":"574460e060e5431100d7b246","foundOn":"2016-05-26T10:33:46.355Z"}},{"xPos":21,"yPos":9,"zPos":2,"tile":{"_id":138,"suit":"Season","name":"Spring","matchesWholeSuit":true,"__v":0,"id":"138"},"_id":"574460e060e5431100d7b23f","match":{"foundBy":"m.vandeven4@student.avans.nl","otherTileId":"574460e060e5431100d7b217","foundOn":"2016-05-26T10:32:27.143Z"}}];

	it('Should return all ', function(_unmatchedtile_){
		console.log(_unmatchedtile_);
		// Filters zijn het gemakkelijkst te testen omdat ze jouw zelf gemaakte functie returnen.
		// var result = Filter.unmatchedtile(TestTiles);
		// console.log(result);
		// expect(result).to.have.length(3);

		// done();
	});

	// it('should not capitalize my reverse my text', function(done){
	// 	// Filters zijn het gemakkelijkst te testen omdat ze jouw zelf gemaakte functie returnen.
	// 	var result = reverseFilter('Reverse this', false);
	// 	expect(result).to.equal('siht esreveR');

	// 	done();
	// });

	// it('should capitalize my reverse my text', function(done){
	// 	// Filters zijn het gemakkelijkst te testen omdat ze jouw zelf gemaakte functie returnen.
	// 	var result = reverseFilter('Reverse this', true);
	// 	expect(result).to.equal('SIHT ESREVER');

	// 	done();
	// });

});