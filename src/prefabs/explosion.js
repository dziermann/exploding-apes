//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Explosion extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame, explosionType) {
    super(game, x, y);
    this.emitter = this.game.add.emitter(0, 0, 100);
    //setup audio
    this.sparkle = this.game.add.audio('sparkle');

    this.emitter.gravity = 100;
    if (explosionType === 'bananas') {

    } else if (explosionType === 'stars') {
      this.emitter.makeParticles('star', [0, 1], 200, true);
      this.sparkle.play();
      var unicornColors = [
          '0xff00aa',
          '0xbe00dc',
          '0x8c51ff',
          '0x0028ec',
          '0x005afb',
          '0x00e8f6',
          '0x45fff3',
          '0x00e1a9',
          '0x82ffc3',
          '0x00ff01',
          '0xffef6b',
          '0xfed853',
          '0xffa825',
          '0xffa137',
          '0xff5039'
      ]
      console.log(unicornColors.length);
      this.emitter.forEach(function(particle) {
        //particle.tint = 0x00AF33;
      });
      this.particleBurst({
        'x': x,
        'y': y
      }, 10);
    } else {
      this.emitter.makeParticles('bananas', [0, 1], 200, true);
      this.particleBurst({
        'x': x,
        'y': y
      }, 100);
    }



    //this.shakenflash();
  }
  particleBurst(pointer, particleNumber) {

    //  Position the emitter where the mouse/touch event was
    this.emitter.x = pointer.x + 80;
    this.emitter.y = pointer.y + 120;

    this.emitter.minParticleSpeed.setTo(-200, -300);
    this.emitter.maxParticleSpeed.setTo(200, -400);
    this.emitter.gravity = 150;
    this.emitter.bounce.setTo(0.5, 0.5);
    this.emitter.angularDrag = 30;


    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    this.emitter.start(true, 2000, null, particleNumber);
  }
  shakenflash() {
    this.game.camera.shake(0.05, 100);
    this.game.camera.flash(0xffffff, 100);
  }


}

export default Explosion;
