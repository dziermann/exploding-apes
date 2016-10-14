import Player from '../prefabs/player';
import DebugPlayer from '../prefabs/player-debug';
import Platform from '../prefabs/platform';

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

    //group(parent, name, addToStage, enableBody, physicsBodyType)
    this.playerEffectsGroup = this.game.add.group(undefined, 'playerEffectsGroup', true, true);

    this.configurePhysics();
    this.createClouds();
    this.createPlayer();
    this.createBricks();
    this.createPlatforms();

    this.game.time.events.add(Phaser.Timer.SECOND * 30, this.gameOver, this);
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

      this.player1 = new Player(this.game, this.game.world.centerX - 100, this.game.world.height, 'unicorn1', 'keyboard', this);
      this.player2 = new Player(this.game, this.game.world.centerX + 100, this.game.world.height, 'unicorn2', 'controller', this);

    this.game.add.existing(this.player1);
    this.game.add.existing(this.player2);

    //  And then add it to the group
    this.playerEffectsGroup.add(this.player1);
    this.playerEffectsGroup.add(this.player2);

    console.log('this.playerEffectsGroup: ', this.playerEffectsGroup.children);
  }

  update() {
    this.game.physics.arcade.collide(this.platform, this.player1);
    this.game.physics.arcade.collide(this.platform, this.player2);
    this.game.physics.arcade.collide(bricks, this.player1);
    this.game.physics.arcade.collide(bricks, this.player2);

    if (this.player1.alive) {
      this.player1.addScore(0.1);
    }

    if (this.player2.alive) {
      this.player2.addScore(0.1);
    }
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

  gameOver() {
    this.game.state.start('gameover', true, false, [this.player1, this.player2]);
  }

}

export default Game;
