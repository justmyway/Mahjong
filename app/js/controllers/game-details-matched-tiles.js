angular.module('Mahjong.controllers')
    .controller('gameDetailsMatchTilesController',
    	function($rootScope, $scope, matchedTiles){

    	$scope.participants = $rootScope.gameDetails.players;

		$scope.matchedTiles = matchedTiles;
    	
    });