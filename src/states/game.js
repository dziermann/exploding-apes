import Player  from '../prefabs/player'
import Platform from '../prefabs/platform'
import Explosion from '../prefabs/explosion';

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    //add background image
    this.background = this.game.add.sprite(0,0,'cloud-tiles');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.platform = new Platform(this.game, 100, this.game.height - 50);
    this.game.add.existing(this.platform);

    //setup prefabs

    this.player = new Player(this.game, this.game.world.centerX, this.game.world.height, 4);

    //particles
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
    this.game.add.existing(this.player);

  }

  update() {
    this.game.physics.arcade.collide(this.platform, this.player);
  }

}

export default Game;
