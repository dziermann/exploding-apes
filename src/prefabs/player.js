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
    this.animations.add('right', [1, 2, 3, 2], 3, true);
    this.animations.add('left', [9, 8, 7, 8], 3, true);
	this.animations.add('idle', [0, 5], 1, false);
	this.animations.add('jump-right', [0, 5], 1, false);
	this.animations.add('jump-left', [0, 5], 1, false);
	this.animations.add('jump', [0, 5], 1, false);

	//setup audio
    this.sparkle = this.game.add.audio('sparkle');

    //set size
    this.scale.setTo(2, 2);

    //physics
    this.body.bounce.set(0.0);

    //set cursors
    this.cursors = game.input.keyboard.createCursorKeys();
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.game.input.gamepad.start();
    this.pad1 = game.input.gamepad.pad1;


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
	  this.animations.play('idle');
    }


    if (this.spacebar.isDown && this.body.velocity.y === 0) {
      this.body.velocity.y = -600;
	  this.sparkle.play();
      this.explosion = new Explosion(this.game, this.body.position.x, this.body.position.y, '', 'banana');
      this.game.add.existing(this.explosion);
    }



    // CONTROLLER INPUT
    if (this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
      this.body.velocity.x = -400;
      this.animations.play('left');
    } else if (this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
      this.body.velocity.x = 400;
      this.animations.play('right');
    }

    if (this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && this.body.velocity.y == 0) {
      this.body.velocity.y = -600;
    } else if (this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
      console.log('down');
    }

    if (this.pad1.justPressed(Phaser.Gamepad.XBOX360_A)) {
      this.explosion = new Explosion(this.game, this.body.position.x, this.body.position.y, '', 'banana');
      this.game.add.existing(this.explosion);
    }
    if (this.pad1.justPressed(Phaser.Gamepad.XBOX360_X)) {
      console.log('X');
    }
    if (this.pad1.justPressed(Phaser.Gamepad.XBOX360_Y)) {
      console.log('Y');
    }
    if (this.pad1.justPressed(Phaser.Gamepad.XBOX360_B)) {
      console.log('B');
    }

  }

}

export default Player;
