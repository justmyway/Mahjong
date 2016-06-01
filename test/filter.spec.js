describe("Filters", function() {
	var filter;
	var unMatchedFilter;

	
	beforeEach(module('Mahjong'));

	beforeEach(inject(function($filter, $injector){
		filter = $filter;
		unMatchedFilter = filter('unmatchedtile');
	}));

	it('has a matched filter', inject(function($filter) {
        expect($filter('unmatchedtile')).not.to.equal(null);
    }));

    it('Should return 1 unMatched', function(done){

		var TestTiles = [{"xPos":21,"yPos":9,"zPos":2,"tile":{"_id":138,"suit":"Season","name":"Spring","matchesWholeSuit":true,"__v":0,"id":"138"},"_id":"574460e060e5431100d7b23f"}];

		expect(unMatchedFilter(TestTiles)).to.have.length(1);

		done();
	});

	it('Should return 0 unMatched', function(done){

		var TestTiles = [{"xPos":21,"yPos":9,"zPos":2,"tile":{"_id":138,"suit":"Season","name":"Spring","matchesWholeSuit":true,"__v":0,"id":"138"},"_id":"574460e060e5431100d7b23f","match":{"foundBy":"m.vandeven4@student.avans.nl","otherTileId":"574460e060e5431100d7b217","foundOn":"2016-05-26T10:32:27.143Z"}}];

		expect(unMatchedFilter(TestTiles)).to.have.length(0);

		done();
	});

	it('Should return all', function(done){

		// 5 objecten
		// 3 niet gematched 2 wel
		var TestTiles = [{"xPos":19,"yPos":7,"zPos":2,"tile":{"_id":5,"suit":"Circle","name":"2","matchesWholeSuit":false,"__v":0,"id":"5"},"_id":"574460e060e5431100d7b236"},{"xPos":3,"yPos":9,"zPos":0,"tile":{"_id":7,"suit":"Circle","name":"2","matchesWholeSuit":false,"__v":0,"id":"7"},"_id":"574460e060e5431100d7b1e0"},{"xPos":19,"yPos":7,"zPos":3,"tile":{"_id":140,"suit":"Flower","name":"Plum","matchesWholeSuit":true,"__v":0,"id":"140"},"_id":"574460e060e5431100d7b246"},{"xPos":9,"yPos":11,"zPos":0,"tile":{"_id":142,"suit":"Flower","name":"Chrysantememum","matchesWholeSuit":true,"__v":0,"id":"142"},"_id":"574460e060e5431100d7b1ee","match":{"foundBy":"m.vandeven4@student.avans.nl","otherTileId":"574460e060e5431100d7b246","foundOn":"2016-05-26T10:33:46.355Z"}},{"xPos":21,"yPos":9,"zPos":2,"tile":{"_id":138,"suit":"Season","name":"Spring","matchesWholeSuit":true,"__v":0,"id":"138"},"_id":"574460e060e5431100d7b23f","match":{"foundBy":"m.vandeven4@student.avans.nl","otherTileId":"574460e060e5431100d7b217","foundOn":"2016-05-26T10:32:27.143Z"}}];

		expect(unMatchedFilter(TestTiles)).to.have.length(3);

		done();
	});

});