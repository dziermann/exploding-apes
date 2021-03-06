import Explosion from '../prefabs/explosion';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Player extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'player', frame);

    //setup physics properties
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;

    //set animations
    this.animations.add('right', [5, 6, 7, 8], 4, true);
    this.animations.add('left', [0, 1, 2, 3], 4, true);

    //set size
    this.scale.setTo(2, 2);

    this.body.velocity.setTo(200, 200);

    this.body.bounce.set(0.0);
    this.body.gravity.set(0, 1000);
    this.jumpTimer = 0;

    //set cursors
    this.cursors = game.input.keyboard.createCursorKeys();
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


  }

  update() {
    this.body.velocity.x = 0;


    if (this.cursors.left.isDown) {
      this.body.velocity.x = -400;
      this.animations.play('left');
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = 400;
      this.animations.play('right');
    }

    if (this.cursors.up.isDown) {
      this.body.velocity.y = -400;
    } else if (this.cursors.down.isDown) {
      this.body.velocity.y = 400;
    }

    if(! (this.cursors.up.isDown
        || this.cursors.right.isDown
        || this.cursors.down.isDown
        || this.cursors.left.isDown)) {
      this.body.velocity.x = 0;
      this.animations.stop();
    }

  }

}

export default Player;
