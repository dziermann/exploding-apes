//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Player extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'dude', frame);

    //setup physics properties
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;

    //set click event
    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

    //set size
    this.width = 100;
    this.scale.y = Math.abs(this.scale.x);

  }

  update () {
    var standing = this.player.body.blocked.down || this.player.body.touching.down;

    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;

        if (this.facing !== 'left')
        {
            this.player.play('left');
            this.facing = 'left';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;

        if (this.facing !== 'right')
        {
            this.player.play('right');
            this.facing = 'right';
        }
    }
    else
    {
        if (this.facing !== 'idle')
        {
            this.player.animations.stop();

            if (this.facing === 'left')
            {
                this.player.frame = 0;
            }
            else
            {
                this.player.frame = 5;
            }

            this.facing = 'idle';
        }
    }
            
    if (standing && this.cursors.up.isDown && this.time.time > this.jumpTimer)
    {
        this.player.body.velocity.y = -500;
        this.jumpTimer = this.time.time + 750;
    }
  }

}

export default Player;
