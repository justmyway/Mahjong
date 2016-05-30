angular.module('Mahjong.filters', [])
.filter('array', function() {

    return function(items) {
        var filtered = [];
        angular.forEach(items, function(item) {
            filtered.push(item);
        });
        return filtered;
    };  
})

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