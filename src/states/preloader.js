class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  loadResources() {
    this.game.load.image('title', 'assets/spacekong.jpg');
    this.game.load.image('background', 'assets/background.jpg');
    this.game.load.image('brick', 'assets/brick.png', 50, 50);
    this.game.load.image('platform-grass', 'assets/platform.png');
    this.game.load.image('star', 'assets/sparkle.png');
    this.game.load.image('cloud-tiles', 'assets/cloud-tiles.png');
    this.game.load.image('bananas', 'assets/bananas.png', 40, 40);

    this.game.load.audio('gunshot', 'assets/gunshot.wav');
    this.game.load.audio('ding', 'assets/ding.wav');
    this.game.load.audio('sparkle', 'assets/sparkle.wav');

    this.game.load.spritesheet('unicorn1', 'assets/unicorn1.png', 80, 100);
    this.game.load.spritesheet('unicorn2', 'assets/unicorn2.png', 80, 100);

  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
