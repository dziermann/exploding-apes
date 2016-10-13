import Player  from '../prefabs/player'
import Platform from '../prefabs/platform'

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    //add background image
    this.background = this.game.add.sprite(0,0,'background');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;

    var platform = new Platform(this.game, 100, this.game.height - 100);
    this.game.add.existing(platform);

    //setup prefabs
    this.player = new Player(this.game, this.game.world.centerX, this.game.world.height, 4);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
    this.game.add.existing(this.player);

  }

  update() {

  }

}

export default Game;
