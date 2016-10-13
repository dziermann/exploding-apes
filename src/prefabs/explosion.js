//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Explosion extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y, frame, explosionType) {
        super(game, x, y);
		console.log('Explosion ', explosionType, ' incoming');
        this.emitter = this.game.add.emitter(0, 0, 100);

        this.emitter.makeParticles('banana');

		if(explosionType === 'cucumber') {
			this.emitter.forEach(function(particle) {
				// tint every particle red
				particle.tint = 0x00AF33;
			});
		}

        this.emitter.gravity = 200;
		this.particleBurst({'x': x, 'y': y});
    }
    particleBurst(pointer) {

        //  Position the emitter where the mouse/touch event was
        this.emitter.x = pointer.x;
        this.emitter.y = pointer.y;


        //  The first parameter sets the effect to "explode" which means all particles are emitted at once
        //  The second gives each particle a 2000ms lifespan
        //  The third is ignored when using burst/explode mode
        //  The final parameter (10) is how many particles will be emitted in this single burst
        this.emitter.start(true, 2000, null, 10);
    }


}

export default Explosion;
