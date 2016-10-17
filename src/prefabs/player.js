import Explosion from '../prefabs/explosion';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Player extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, sprite, control, gameState) {
    super(game, x, y, sprite, 0);

    this.score = 0;
    this.alive = true;
    this.control = control;
    this.gameState = gameState;
    //setup physics properties
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);

    //this.game.world.setBounds(0, 0, this.game.world.height, this.game.world.width);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    //set animations
    this.animations.add('right', [1, 2, 3, 2], 6, true);
    this.animations.add('left', [9, 8, 7, 8], 6, true);
    this.animations.add('idle', [0, 5], 1, false);
    this.animations.add('jump-right', [4], 1, false);
    this.animations.add('jump-left', [6], 1, false);
    this.animations.add('jump', [10], 1, false);

    //set size
    this.scale.setTo(1, 1);

    //physics
   this.body.bounce.set(0.0);
   this.body.gravity.set(0, 1000);

    //set cursors
    this.cursors = game.input.keyboard.createCursorKeys();
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.game.input.gamepad.start();
    this.pad1 = game.input.gamepad.pad1;


  }

  update() {
    this.body.velocity.x = 0;
    var cursorLeft = this.cursors.left.isDown;
    var cursorRight = this.cursors.right.isDown;
    var controllerLeft = this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1;
    var controllerRight = this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1;
    var spacebarDown = this.spacebar.isDown;
    var controllerDown = this.pad1.justPressed(Phaser.Gamepad.XBOX360_A);


      if ((this.control === 'keyboard' && cursorLeft) || (this.control === 'controller' && controllerLeft)) {
        this.body.velocity.x = -400;
        if (this.body.velocity.y !== 0) {
          this.animations.play('jump-left');
        } else {
          this.animations.play('left');
        }

      } else if ((this.control === 'keyboard' && cursorRight) || (this.control === 'controller' && controllerRight)) {
        this.body.velocity.x = 400;
        if (this.body.velocity.y !== 0) {
          this.animations.play('jump-right');
        } else {
          this.animations.play('right');
        }
      } else if (this.body.velocity.y === 0) {
        this.animations.play('idle');
      }

      if (this.body.wasTouching.down && (this.control === 'keyboard' && spacebarDown) || (this.control === 'controller' && controllerDown)) {
        this.body.velocity.y = -700;
        this.animations.play('jump');
        this.explosion = new Explosion(this.game, this.body.position.x, this.body.position.y, '', 'stars', this.gameState);
        this.game.add.existing(this.explosion);
      }
  }

  killPlayer () {
    this.alive = false;
    this.destroy();
  }

  addScore (score) {
    this.score += score;
  }

  explode() {
    this.scale.setTo(2, 0.5);
    var thisScale = this.scale;
    setTimeout(function() {thisScale.setTo(1, 1)}, 1000);
    // this.killPlayer();
  }

}

export default Player;
