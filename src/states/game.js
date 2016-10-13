import Player  from '../prefabs/player'
import Explosion from '../prefabs/explosion';

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
    this.player = new Player(this.game,this.game.world.centerX,this.game.world.centerY, 4);

	//particles
	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
    this.game.add.existing(this.player);
  }

  update() {

  }

}

export default Game;
