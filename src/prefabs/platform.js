//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Platform extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'platform-grass', frame);

    //setup physics properties
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    this.body.checkCollision.up = true;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
    this.body.immovable = true;
  }

  update () {

  }

}

export default Platform;
