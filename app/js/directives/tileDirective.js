angular.module('Mahjong.directives', [])

.directive('tile', function() {

    return {
        restrict: "E",
        template: '<div ng-class="activeTile(data._id) ? \'selectedTile\' : \'\'" class="tile" ng-click="clickTile(data)" xPos="{{data.xPos}}" yPos="{{data.yPos}}" zPos="{{data.zPos}}" name="{{data.tile.name}}" suit="{{data.tile.suit}}"></div>',
        scope: {
            data: '=',
        },
    };
})