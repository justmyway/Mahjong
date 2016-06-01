angular.module('Mahjong.filters', [])

.filter('unmatchedtile', function() {

    return function(tiles) {

        var filtered = [];

        angular.forEach(tiles, function(tile, key){
            if(tile.match == undefined)
                filtered.push(tile);
        });

        return filtered;
    }
})