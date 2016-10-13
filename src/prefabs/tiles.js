//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Tiles extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, 0, 0, 'walltiles');

    //set size

    this.anchor.setTo(0.5, 0.5);
  }

  update(){
  }

}

export default Tiles;
