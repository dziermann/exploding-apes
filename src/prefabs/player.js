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

    //physics
    this.body.bounce.set(0.0);

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
    } else {
      this.body.velocity.x = 0;
      this.frame = 4;
    }


    if (this.spacebar.isDown && this.body.velocity.y == 0) {
      this.body.velocity.y = -600;
      this.explosion = new Explosion(this.game, this.body.position.x, this.body.position.y, '', 'banana');
      this.game.add.existing(this.explosion);
    }


  }

}

export default Player;
