import Crosshairs  from '../prefabs/crosshairs'
import Player  from '../prefabs/player'

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    //add background image
    this.background = this.game.add.sprite(0,0,'background');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;


    //setup prefabs
    this.player = new Player(this.game,this.game.world.centerX,0);
    this.game.add.existing(this.player);

    //setup a timer to end the game
  }

  update() {
    
  }

}

export default Game;
