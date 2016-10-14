class Gameover extends Phaser.State {

  constructor() {
    super();
    
  }

  init (params) {
    this.p1 = params[0];
    this.p2 = params[1];
  }

  create() {
    if (this.p1.score > this.p2.score) winner = 'Player 1';
    else if (this.p1.score < this.p2.score) winner = 'Player 2';

    this.p1.killPlayer();
    this.p2.killPlayer();
    

    this.gameOverText = this.game.add.text(this.game.world.centerX - 150, this.game.world.centerY - 80, `GAME OVER`, {
            font: "50pt Courier",
            fill: "#ff1779",
            stroke: "#c70078",
            strokeThickness: 2
        });

    this.winnerText = this.game.add.text(this.game.world.centerX - 150, this.game.world.centerY, `the winner is ${winner}`, {
            font: "25pt Courier",
            fill: "#ff1779",
            stroke: "#c70078",
            strokeThickness: 2
        });

    this.playerText1 = this.game.add.text(150, this.game.world.height - 200, `Player 1: ${Math.floor(this.p1.score)}`, {
            font: "20pt Courier",
            fill: "#ff1779",
            stroke: "#c70078",
            strokeThickness: 2
        });

    this.playerText2 = this.game.add.text(150, this.game.world.height - 150, `Player 2: ${Math.floor(this.p2.score)}`, {
            font: "20pt Courier",
            fill: "#ff1779",
            stroke: "#c70078",
            strokeThickness: 2
        });

    this.input.onDown.add(this.onInputDown, this);
  }

  update() {

  }

  onInputDown() {
    this.game.state.start('menu');
  }

}

export default Gameover;
