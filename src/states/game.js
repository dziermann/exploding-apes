import Player from '../prefabs/player';
import DebugPlayer from '../prefabs/player-debug';;
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

    this.configurePhysics();
    this.createClouds();
    this.createPlayer();
    this.createBricks();
    this.createPlatforms();
  }

  createClouds() {
    //group(parent, name, addToStage, enableBody, physicsBodyType)
    this.clouds = this.game.add.group(undefined, 'clouds', false, true, Phaser.Physics.ARCADE);
    this.clouds.tileWidth = this.game.world.width;
    this.clouds.tileHeight = this.game.world.height;
    this.clouds.createMultiple(3, 'cloud-tiles');

    window.clouds = this.clouds;
    for(var i = 0; i < this.clouds.children.length; i++) {
      var currentCloud = this.clouds.children[i];
      var height = this.game.world.height;
      currentCloud.events.onKilled.add(function(cloud){
        this.initCloud(cloud, 0, - (height - 5));
      }, this);
      this.initCloud(currentCloud, 0, height - i * (height - 5));
    }
  }

  configurePhysics() {
    //physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  createPlayer() {
    if (location.search === '?debug') {
      this.player1 = new DebugPlayer(this.game, this.game.world.centerX - 100, this.game.world.height, 'player', 'keyboard');
      this.player2 = new DebugPlayer(this.game, this.game.world.centerX + 100, this.game.world.height, 'player', 'controller');
    } else {
      this.player1 = new Player(this.game, this.game.world.centerX - 100, this.game.world.height, 'player', 'keyboard');
      this.player2 = new Player(this.game, this.game.world.centerX + 100, this.game.world.height, 'player', 'controller');

    }
    this.game.add.existing(this.player1);
    this.game.add.existing(this.player2);
  }

  update() {
    this.game.physics.arcade.collide(this.platform, this.player);
    this.game.physics.arcade.collide(bricks, this.player);
  }

  initCloud(cloud, x, y){
    if(cloud){
      cloud.width = this.game.world.width;
      cloud.height = this.game.world.height;
      //Reset it to the specified coordinates
      cloud.reset(x, y);
      cloud.body.velocity.y = 150;
      cloud.body.immovable = true;
      cloud.body.acceleration = new Phaser.Point();
      //When the tile leaves the screen, move it to top
      cloud.checkWorldBounds = true;
      cloud.outOfBoundsKill = true;
    }
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
      x: Math.floor(Math.random() * (worldWidthMax - worldWidthMin + 1)) + worldWidthMin,
      y: Math.floor(Math.random() * (worldHeightMax - worldHeightMin + 1)) + worldHeightMin
    };
  }

}

export default Game;
