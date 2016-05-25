angular.module('Mahjong.logic', [])
    .factory('TileProccessing',
        function() {

        	var self = {
        		gameTiles: {},
        		activeTile: {}
        	};

        	function isOntop(tile, checkable){
        		if(checkable.zPos > tile.zPos){
	        		if(checkable.xPos >= tile.xPos -1 && checkable.xPos <= tile.xPos +1){
	        			if(checkable.yPos >= tile.yPos -1 && checkable.yPos <= tile.yPos +1){
	        				return true;
	        			}
	        		}
	        	}
	        	return false;
        	}

        	function blockedSides(tile, gameTile, holder){

        		if(tile.xPos -2 == gameTile.xPos && heightOnSide(tile, gameTile) && gameTile.zPos >= tile.zPos){
        			holder.left = false;
        		}
        		if(tile.xPos +2 == gameTile.xPos && heightOnSide(tile, gameTile) && gameTile.zPos >= tile.zPos){
        			holder.right = false;
        		}


        		return holder;
        	}

        	function heightOnSide(tile, gameTile){
        		return (tile.yPos -1 <= gameTile.yPos && tile.yPos +1 >= gameTile.yPos);
        	}

        	return {
        		setGameTiles: function(gameTiles){
        			self.gameTiles = gameTiles.Tiles;
        		},
        		selectedTileId: function(){
        			return self.activeTile._id;
        		},
        		accessableTile: function(tile){
        			var posible = true;
        			var emptySide = {
        				right: true,
        				left: true
        			}

        			angular.forEach(self.gameTiles, function(gameTile){
        				if(gameTile._id != tile._id && tile.zPos <= gameTile.zPos && posible){

        					if(isOntop(tile, gameTile)){
        						posible = false;
        					}

        					emptySide = blockedSides(tile, gameTile, emptySide);

        					if(!emptySide.right && !emptySide.left){
        						posible = false;
        					}
        				}
        			});

        			return posible;
        		},
        		checkMatchTile: function(tile, callback, error){

        		}
        	};

        });