class Scroller extends Phaser.Group {

  constructor (game, tileId, name, scrollspeed, tileHeight, tileWidth, align) {
    // this.game, parent, name, addToStage, enableBody, physicsBodyType
    super(game, undefined, name, false, true, Phaser.Physics.ARCADE);
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.scrollspeed = scrollspeed;
    var neededTiles = Math.floor(game.world.height / tileHeight) + 2;
    console.log("needing many tiles:" , neededTiles);
    this.createMultiple(neededTiles, tileId);

    for(var i = 0; i < this.children.length; i++) {
      var tile = this.children[i];
      var height = game.world.height;
      tile.events.onKilled.add(function(tile){
        this.initTile(tile, 0, - tileHeight);
      }, this);
      console.log("init tile with y: ", i * tileHeight - tileHeight);
      this.initTile(tile, 0, i * tileHeight - tileHeight);
    }
  }

  initTile(tile, x, y){
      tile.width = this.tileWidth;
      tile.height = this.tileHeight;
      tile.reset(x, y);
      tile.body.velocity.y = this.scrollspeed;
      tile.body.immovable = true;
      tile.body.acceleration = new Phaser.Point();
      tile.checkWorldBounds = true;
      tile.outOfBoundsKill = true;
  }

}

export default Scroller;
