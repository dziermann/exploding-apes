import Explosion from '../prefabs/explosion';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Enemy extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame, player) {
    super(game, x, y, 'enemy', frame);
    this.count = 0;

    //setup physics properties
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;

    //this.body.checkCollision.down = false;

    //set animations
    this.animations.add('default', [1, 2, 3, 4, 5], 4, false);

    //set size
    //this.scale.setTo(1, 1);

    //physics
    this.body.bounce.set(0.0);

    this.scale.setTo(2, 2);





    //  Creates 1 single bullet, using the 'bullet' graphic
    this.weapon = this.game.add.weapon(3, 'banana');

    //  The bullet will be automatically killed when it leaves the world bounds
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon.fireAngle = 40;
    this.weapon.bulletAngleVariance = 20;

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 600;
    this.weapon.bulletSpeedVariance = 100;

    //this.weapon.bulletGravity = 5;
    this.weapon.bulletAngleOffset = 30;

    this.weapon.trackSprite(this, 14, 0);

    //this.game.physics.arcade.collide(this.weapon, player);

    this.fx = game.add.audio('gunshot');


  }

  getWeapon() {
    return this.weapon;
  }

  update() {
    //new Explosion(this.game, this.body.position.x, this.body.position.y, '', 'banana');
    this.count++;

    if(!(this.count % this.rand(100, 150))) {
      this.animations.play('default');
      this.weapon.fire();
      this.fx.play();
      this.count = 0;
    }
  }

  rand (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}

export default Enemy;
