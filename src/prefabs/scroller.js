class Scroller extends Phaser.Group {

  constructor(game, tileId, name, scrollspeed, tileHeight, tileWidth, align, checkCollision) {
    super(game, undefined, name, false, true, Phaser.Physics.ARCADE);
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.scrollspeed = scrollspeed;
    this.x = align === 'right' ? game.world.width - tileWidth : 0;
    this.checkCollision = {
        top : checkCollision ? !!checkCollision.top : false,
        right: checkCollision ? !!checkCollision.right : false,
        down : checkCollision ? !!checkCollision.down : false,
        left : checkCollision ?  !!checkCollision.left : false
    };
    var neededTiles = Math.floor(game.world.height / tileHeight) + 2;
    this.createMultiple(neededTiles, tileId);

    for (var i = 0; i < this.children.length; i++) {
      var tile = this.children[i];
      var height = game.world.height;
      tile.events.onKilled.add(function(tile) {
        this.initTile(tile, 0, this.top - this.tileHeight + 2);
      }, this);
      this.initTile(tile, 0, i * this.tileHeight - this.tileHeight);
    }
  }

  initTile(tile, x, y) {
    tile.width = this.tileWidth;
    tile.height = this.tileHeight;
    tile.reset(x, y);
    tile.body.checkCollision.top = this.checkCollision.top;
    tile.body.checkCollision.right = this.checkCollision.right;
    tile.body.checkCollision.down = this.checkCollision.down;
    tile.body.checkCollision.left = this.checkCollision.left;
    tile.body.velocity.y = this.scrollspeed;
    tile.body.immovable = true;
    tile.body.acceleration = new Phaser.Point();
    tile.checkWorldBounds = true;
    tile.outOfBoundsKill = true;
  }

}

export default Scroller;
