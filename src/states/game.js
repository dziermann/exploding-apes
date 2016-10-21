import Player from '../prefabs/player';
import DebugPlayer from '../prefabs/player-debug';
import Platform from '../prefabs/platform';
import Enemy from '../prefabs/enemy';
import Menu from '../states/menu';
import Scroller from '../prefabs/scroller'

var bricks;

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    //group(parent, name, addToStage, enableBody, physicsBodyType)
    this.playerEffectsGroup = this.game.add.group(undefined, 'playerEffectsGroup', true, true);

    this.configurePhysics();
    this.clouds = new Scroller(this.game, 'cloud-tiles', 'clouds', 100, this.game.world.height, this.game.world.width);
    this.createPlatforms(75);
    this.createPlayer(this);

    this.createBricks();
    this.createEnemies();

    this.game.time.events.add(Phaser.Timer.SECOND * 30, this.gameOver, this); //game time = 60
  }

  configurePhysics() {
    //physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }


  getStartPlatforms() {
    var platforms = this.platforms.children;
    return platforms.slice(platforms.length - 2)
  }

  createPlayer(that) {
    var platforms = this.getStartPlatforms();

    this.player1 = new Player(this.game, this.game.world.centerX - 100, this.game.world.height / 2, 'unicorn1', 'keyboard', this);
    platforms[0].x = this.player1.x - platforms[0].width / 2;
    platforms[0].y = this.player1.y + this.player1.height;

    this.player2 = new Player(this.game, this.game.world.centerX + 100, this.game.world.height / 2, 'unicorn2', 'controller', this);
    platforms[1].x = this.player2.x - platforms[1].width / 2;
    platforms[1].y = this.player2.y + this.player2.height;

    this.game.add.existing(this.player1);
    this.game.add.existing(this.player2);

    //  And then add it to the group
    this.playerEffectsGroup.add(this.player1);
    this.playerEffectsGroup.add(this.player2);

    /**
    this.player1.events.onKilled.add(function(player){
      player.killPlayer();
      that.gameOver();
    })

    this.player2.events.onKilled.add(function(player){
      player.killPlayer();
      that.gameOver();
    })
    **/
  }

  createEnemies() {
    var displayHeight = this.game.world.height;
    var displayHeight = this.game.world.height;
    var displayWidth = this.game.world.width;
    this.enemy = new Enemy(this.game, displayWidth - 120, displayHeight - 500, this.player);
    this.enemy2 = new Enemy(this.game, 120, displayHeight - 500, this.player);
    this.game.add.existing(this.enemy);
    //this.game.add.existing(this.enemy2);
  }
  explode1() {
    this.player1.explode();
  }

  explode2() {
    this.player2.explode();
  }

  update() {
    [this.player1, this.player2].forEach(function(player) {
      this.game.physics.arcade.collide(this.leftBricks, player);
      this.game.physics.arcade.collide(this.rightBricks, player);
      this.game.physics.arcade.collide(this.platforms, player);

    }, this);

    /*if (this.player1.alive) {
      this.player1.addScore(0.01);
    }

    if (this.player2.alive) {
      this.player2.addScore(0.01);
    }*/

    this.game.physics.arcade.collide(this.enemyBricks, this.enemy);
    this.game.physics.arcade.overlap(this.enemy.getWeapon().bullets, this.player1, this.explode1, null, this);
    this.game.physics.arcade.overlap(this.enemy.getWeapon().bullets, this.player2, this.explode2, null, this);

  }

  createBricks() {
    var checkCollision = {
      top: true,
      right: true,
      down: true,
      left: true
    };
    this.leftBricks = new Scroller(this.game, 'brick', 'left-bricks', 175, 100, 100, "left", checkCollision);
    this.rightBricks = new Scroller(this.game, 'brick', 'right-bricks', 175, 100, 100, "right", checkCollision);
    window.leak = this.rightBricks;
  }

  createPlatforms(distance) {
    //group(parent, name, addToStage, enableBody, physicsBodyType)
    this.platforms = this.game.add.group(undefined, 'platforms', false, true, Phaser.Physics.ARCADE);
    this.platforms.createMultiple(20, 'platform-grass');

    function randomBetween(a, b) {
      if (a > b) {
        var c = a;
        a = b;
        b = c;
      }
      var dist = b - a;
      var rand = Math.round(Math.random() * dist);
      return a + rand;
    }

    for (var i = 0; i < this.platforms.children.length; i++) {
      var currentPlatform = this.platforms.children[i];
      var height = this.game.world.height;
      var width = this.game.world.width;
      currentPlatform.events.onKilled.add(function(platform) {
        this.initPlatform(platform, randomBetween(0, width), 0 - platform.height);
      }, this);
      this.initPlatform(currentPlatform, randomBetween(0, width), height - distance * ((i - i % 2) + 1));
    }
  }

  initPlatform(platform, x, y) {
    if (platform) {

      //Reset it to the specified coordinates
      platform.reset(x, y);
      platform.body.checkCollision.top = true;
      platform.body.checkCollision.right = false;
      platform.body.checkCollision.down = false;
      platform.body.checkCollision.left = false;
      platform.body.velocity.y = 150;
      platform.body.immovable = true;
      platform.body.acceleration = new Phaser.Point();

      //When the tile leaves the screen, move it to top
      platform.checkWorldBounds = true;
      platform.outOfBoundsKill = true;
    }
  }

  gameOver() {
    this.game.state.states.menu.music.stop();
    this.game.state.start('gameover', true, false, [this.player1, this.player2]);
  }

}

export default Game;
