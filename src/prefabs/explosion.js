//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Explosion extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame, explosionType) {
    super(game, x, y);
    this.emitter = this.game.add.emitter(0, 0, 100);

    this.emitter.makeParticles('bananas', [0, 1], 200, true);

    if (explosionType === 'cucumber') {
      this.emitter.forEach(function(particle) {
        // tint every particle red
        particle.tint = 0x00AF33;
      });
    }

    this.emitter.gravity = 100;
    this.particleBurst({
      'x': x,
      'y': y
    });
    //this.shakenflash();
  }
  particleBurst(pointer) {

    //  Position the emitter where the mouse/touch event was
    this.emitter.x = pointer.x + 32;
    this.emitter.y = pointer.y + 100;

	this.emitter.minParticleSpeed.setTo(-200, -300);
    this.emitter.maxParticleSpeed.setTo(200, -400);
    this.emitter.gravity = 150;
    this.emitter.bounce.setTo(0.5, 0.5);
    this.emitter.angularDrag = 30;


    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    this.emitter.start(true, 0, null, 100);
  }
  shakenflash() {
    this.game.camera.shake(0.05, 100);
    this.game.camera.flash(0xffffff, 100);

  }


}

export default Explosion;
