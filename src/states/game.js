import Player  from '../prefabs/player';
import Brick  from '../prefabs/brick';
import Platform from '../prefabs/platform';
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
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //setup prefabs
    this.player = new Player(this.game, this.game.world.centerX, this.game.world.height);
    this.game.add.existing(this.player);

    this.createBricks();
    this.createPlatforms();

    //particles
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);

    //physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

  }

  update() {
    this.game.physics.arcade.collide(this.platform, this.player);
  }

  createBricks() {
    var displayHeight = this.game.world.height;

      this.brickLeft = new Brick(this.game, 50, displayHeight-50);
      this.game.add.existing(this.brickLeft);

      this.brickRight = new Brick(this.game, this.game.world.width-50, displayHeight-50);
      this.game.add.existing(this.brickRight);
    
  }

  createPlatforms() {
    var position = this.randomPlatformPosition();
    this.platform = new Platform(this.game, position.x, position.y);
    this.game.add.existing(this.platform);
  }

  randomPlatformPosition() {
    return {x: this.game.world.centerX, y: this.game.world.centerY};
  }

}

export default Game;
