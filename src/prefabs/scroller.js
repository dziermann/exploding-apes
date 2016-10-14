class Scroller extends Phaser.Group {

  constructor (game, tileId, name, offsetX, offesetY) {
    // this.game, parent, name, addToStage, enableBody, physicsBodyType
    super(game, undefined, name, false, true, Phaser.Physics.ARCADE);
    this.tileWidth = game.world.width;
    this.tileHeight = game.world.height;
    this.createMultiple(3, tileId);

    for(var i = 0; i < this.children.length; i++) {
      var tile = this.children[i];
      var height = game.world.height;
      tile.events.onKilled.add(function(tile){
        this.initTile(tile, 0, - height);
      }, this);
      this.initTile(tile, 0, height - i * height);
    }
  }

  initTile(tile, x, y){
      tile.width = this.game.world.width;
      tile.height = this.game.world.height;
      tile.reset(x, y);
      tile.body.velocity.y = 150;
      tile.body.immovable = true;
      tile.body.acceleration = new Phaser.Point();
      tile.checkWorldBounds = true;
      tile.outOfBoundsKill = true;
  }

}
export default Scroller;
