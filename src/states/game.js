import Player from '../prefabs/player';
import Platform from '../prefabs/platform';
import Explosion from '../prefabs/explosion';

var bricks;

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    //add background image
    this.background = this.game.add.sprite(0, 0, 'background');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //setup prefabs
    this.player1 = new Player(this.game, this.game.world.centerX - 100, this.game.world.height, 'player', 'keyboard');
    this.game.add.existing(this.player1);
    this.player2 = new Player(this.game, this.game.world.centerX + 100, this.game.world.height, 'player', 'controller');
    this.game.add.existing(this.player2);

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
    this.game.physics.arcade.collide(bricks, this.player);
  }

  createBricks() {
    bricks = this.game.add.group();
    bricks.enableBody = true;
    var displayHeight = this.game.world.height;

    while (displayHeight > 0) {
      var brickLeft = bricks.create(0, displayHeight - 100, 'brick');
      brickLeft.body.immovable = true;
      brickLeft.scale.setTo(2, 2);
      brickLeft.body.allowGravity = false;

      var brickRight = bricks.create(this.game.world.width - 100, displayHeight - 100, 'brick');
      brickRight.body.immovable = true;
      brickRight.scale.setTo(2, 2);
      brickRight.body.allowGravity = false;

      displayHeight -= 100;
    }

  }

  createPlatforms() {
    var position = this.randomPlatformPosition();
    this.platform = new Platform(this.game, position.x, position.y);
    this.game.add.existing(this.platform);
  }

  randomPlatformPosition() {
    var worldWidthMax = this.game.world.width - 200;
    var worldWidthMin = 200;
    var worldHeightMax = this.game.world.height - 100;
    var worldHeightMin = 100;

    return {
      x: Math.floor(Math.random() * ( worldWidthMax - worldWidthMin + 1)) + worldWidthMin,
      y: Math.floor(Math.random() * ( worldHeightMax - worldHeightMin + 1)) + worldHeightMin
    };
  }

}

export default Game;
