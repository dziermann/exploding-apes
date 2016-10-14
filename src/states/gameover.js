class Gameover extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.text = this.game.add.text(32, this.game.world.height - 100, 'GAME OVER', {
            font: "30pt Courier",
            fill: "#ff1779",
            stroke: "#c70078",
            strokeThickness: 2
        });
  }

  update() {

  }

}

export default Gameover;
