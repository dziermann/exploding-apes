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
    this.game.load.image('background','assets/background.png');
    this.game.load.image('brick', 'assets/brick.png', 50, 50);
    this.game.load.image('platform-grass', 'assets/platform.png');
    this.game.load.image('bananas', 'assets/bananas.png', 40,40);


    this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);

    this.game.load.audio('gunshot','assets/gunshot.wav');
    this.game.load.audio('ding','assets/ding.wav');
  }

  onLoadComplete() {
    this.game.state.start('background');
  }
}

export default Preloader;
