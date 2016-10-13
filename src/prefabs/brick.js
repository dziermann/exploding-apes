//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Brick extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'brick');

    //set size
    this.scale.setTo(2, 2);
    this.anchor.setTo(0.5, 0.5);
  }

  update() {}

}

export default Brick;
