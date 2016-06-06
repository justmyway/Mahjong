describe('directive test', function() {
  var element, tilesElement, scope;

  beforeEach(module('Mahjong'));

  //beforeEach(module('templates/personTemplate.html'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    tilesElement = '<div><div ng-repeat="tile in tiles.Tiles | unmatchedtile" ng-class="activeTile(tile._id) ? \'selectedTile\' : \'\'" class="tile" ng-click="clickTile(tile)" xPos="{{tile.xPos}}" yPos="{{tile.yPos}}" zPos="{{tile.zPos}}" name="{{tile.tile.name}}" suit="{{tile.tile.suit}}"></div></div>';

    scope.tiles = {};
    scope.tiles.Error = undefined;
    scope.tiles.Tiles = [{"xPos":15,"yPos":7,"zPos":3,"tile":{"_id":122,"suit":"Wind","name":"West","matchesWholeSuit":false,"__v":0,"id":"122"},"_id":"574460e060e5431100d7b244"},{"xPos":17,"yPos":9,"zPos":2,"tile":{"_id":60,"suit":"Bamboo","name":"7","matchesWholeSuit":false,"__v":0,"id":"60"},"_id":"574460e060e5431100d7b23d"},{"xPos":15,"yPos":7,"zPos":2,"tile":{"_id":59,"suit":"Bamboo","name":"6","matchesWholeSuit":false,"__v":0,"id":"59"},"_id":"574460e060e5431100d7b234"}];
    // scope.tiles.Tiles.push({"xPos":15,"yPos":7,"zPos":3,"tile":{"_id":122,"suit":"Wind","name":"West","matchesWholeSuit":false,"__v":0,"id":"122"},"_id":"574460e060e5431100d7b244"});
    // scope.tiles.Tiles.push({"xPos":17,"yPos":9,"zPos":2,"tile":{"_id":60,"suit":"Bamboo","name":"7","matchesWholeSuit":false,"__v":0,"id":"60"},"_id":"574460e060e5431100d7b23d"});
    // scope.tiles.Tiles.push({"xPos":15,"yPos":7,"zPos":2,"tile":{"_id":59,"suit":"Bamboo","name":"6","matchesWholeSuit":false,"__v":0,"id":"59"},"_id":"574460e060e5431100d7b234"});

    // console.log(scope);
    // console.log(scope.tiles.Tiles);

    // console.log("begin");

    // console.log(tilesElement);

    view = angular.element(tilesElement);
    element = $compile(view)(scope);

    // element = $compile(tilesElement)(scope);

    scope.$digest();

    // console.log(tilesElement);

    // console.log("eind");
  }));

  describe('test directive', function() {
    
   
    it("should compute the size to create other values", function() {
    // 	console.log("ONDER");
  		// console.log(tilesElement);
  		// console.log("^^^^^");
  		// var isolated = element.isolateScope();
    //   expect(isolated.values.canvas).toBe(250);
    //   expect(isolated.values.center).toBe(125);
    //   expect(isolated.values.radius).toBe(100);
    });
    
    // it("should contain a svg tag with proper size", function() {
    //   expect(element.find('svg').attr('height')).toBe('250');
    //   expect(element.find('svg').attr('width')).toBe('250');
    // });
    
    // it("should contain a circle with proper attributes", function() {
    //   expect(element.find('circle').attr('cx')).toBe('125');
    //   expect(element.find('circle').attr('cy')).toBe('125');
    //   expect(element.find('circle').attr('r')).toBe('100');
    //   expect(element.find('circle').attr('stroke')).toBe('black');
    //   expect(element.find('circle').attr('fill')).toBe('blue');
    // });
  });
});