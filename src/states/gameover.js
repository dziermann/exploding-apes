class Gameover extends Phaser.State {

  constructor() {
    super();
    
  }

  init (params) {
    this.p1 = params[0];
    this.p2 = params[1];
  }

  create() {
    var winnerString = `It's a tie!`;

    if(this.p1.alive && this.p2.alive && this.p1.score > this.p2.score) winnerString = 'The winner is Player 1!';
    else if(this.p1.alive && this.p2.alive && this.p1.score < this.p2.score) winnerString = 'The winner is Player 2!';
    else if(this.p1.alive && !this.p2.alive) winnerString = 'The winner is Player 1!';
    else if(!this.p1.alive && this.p2.alive) winnerString = 'The winner is Player 2!';

    this.p1.killPlayer();
    this.p2.killPlayer();
    

    this.gameOverText = this.game.add.text(0, this.game.world.centerY, `GAME OVER`, {
            font: "60pt Courier",
            fill: "#ff1779",
            stroke: "#c70078",
            strokeThickness: 2,
            boundsAlignH: "center"
        });

    this.winnerText = this.game.add.text(0, this.game.world.centerY - 100, `${winnerString}`, {
            font: "25pt Courier",
            fill: "#ff1779",
            stroke: "#c70078",
            strokeThickness: 2,
            boundsAlignH: "center"
        });

    this.playerText1 = this.game.add.text(0, this.game.world.centerY + 200, `Player 1: ${Math.floor(this.p1.score)}`, {
            font: "20pt Courier",
            fill: "#ff1779",
            stroke: "#c70078",
            strokeThickness: 2,
            boundsAlignH: "center"
        });

    this.playerText2 = this.game.add.text(0, this.game.world.centerY + 240, `Player 2: ${Math.floor(this.p2.score)}`, {
            font: "20pt Courier",
            fill: "#ff1779",
            stroke: "#c70078",
            strokeThickness: 2,
            boundsAlignH: "center"
        });

    this.gameOverText.setTextBounds(0, 0, this.game.world.width, this.game.world.height);
    this.winnerText.setTextBounds(0, 0, this.game.world.width, this.game.world.height);
    this.playerText1.setTextBounds(0, 0, this.game.world.width, this.game.world.height);
    this.playerText2.setTextBounds(0, 0, this.game.world.width, this.game.world.height);

    this.input.onDown.add(this.onInputDown, this);
  }

  update() {

  }

  onInputDown() {
    this.game.state.start('menu');
  }

}

export default Gameover;
