describe("Factory", function() {
	var $httpBackend,
		$controller;

	// initialize the app
	beforeEach(module('Mahjong'));

	beforeEach(inject(function(_$httpBackend_, _$controller_){
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
	}));

	// it('Should replace a method on the service and expect not calling', function() { 
	// 	// Creëer een personController, geef de dependencies aan de constructor by name mee
	// 	var personController = $controller('PersonController', { $scope: {}, PersonService: PersonService });
		
	// 	// Vervang de methode door een stub (in plaats van een nieuwe functie)
	// 	// Hierdoor kunnen we expects gaan doen
	// 	PersonService.addPerson = sinon.stub();

	// 	personController.addPersonToService(undefined, undefined);

	// 	// Omdat het een stub is, heeft het veel methodes om te zien of het aangeroepen is.
	// 	// Zie http://sinonjs.org/docs/
	// 	assert(PersonService.addPerson.notCalled);
	// });

	// it('Should replace a method on the service and expect calling', function() { 
	// 	// Creëer een personController, geef de dependencies aan de constructor by name mee
	// 	var personController = $controller('PersonController', { $scope: {}, PersonService: PersonService });
		
	// 	// Vervang de methode door een stub (in plaats van een nieuwe functie)
	// 	// Hierdoor kunnen we expects gaan doen
	// 	PersonService.addPerson = sinon.stub();

	// 	personController.addPersonToService('Martijn', 'Schuurmans');

	// 	// Omdat het een stub is, heeft het veel methodes om te zien of het aangeroepen is.
	// 	// Zie http://sinonjs.org/docs/
	// 	assert(PersonService.addPerson.calledWith('Martijn', 'Schuurmans'));
	// });

	// HttpBackend is van AngularMocks (en dus niet van SINON)
	// Hiermee kan je calls afvangen die web requests zijn
	it('should mock the httpbackend', function(){
		// Given
		var $rootScope = {};
		var $scope = {};

		var gameListController = $controller('gameListController', {$rootScope: $rootScope, $scope: $scope});

		console.log(gameListController);

		var newGame = {
			minPlayers: 1,
			maxPlayers:	2,
			templateName: "Ox"
		};

		$httpBackend
			.expectPOST('http://mahjongmayhem.herokuapp.com/Games')
			//.respond(404, { err: expectedError });

		gameListController.addNewGame(newGame);
		$httpBackend.flush();

		expect($rootScope.message.text).to.equal('Helaas het russisch sensuur heeft deze call tegen gehouden.');

                            




		// // Given
		// var $scope = {};
		// // Creëer een personController, geef de dependencies aan de constructor by name mee
		// var personController = $controller('PersonController', { $scope: $scope, $httpBackend: $httpBackend });

		// var person = { id: 1, courses: [] };
		// var expectedCode = 'WEBS6';
		// var expectedError = 'Person not found';
		// // Nu expecten we het omdat we in de test zitten.
		// // Bij de before of beforeEach kunnen we ook whenPost stubben
		// $httpBackend
		// 	.expectPOST('http://api.myApp.com/persons/' + person.id + '/courses', { code: expectedCode })
		// 	.respond(404, { err: expectedError });

		// // When
		// personController.addCourse(person, expectedCode);
		// $httpBackend.flush(); // Voer synchroon uit ipv asynchroon

		// // Then
		// expect($scope.error).to.equal(expectedError);
		// expect(person.courses).to.have.length(0);
	});
});
