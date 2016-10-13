class Menu extends Phaser.State {


  constructor() {
    super();
  }

  create() {
    //add background image
    this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'title');
	this.background.anchor.setTo(0.5)
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;

	this.content = [
		" ",
		"angry ape presents",
		"a ʕ•ᴥ•ʔ production",
		" ",
		"ROBO",
		"KONG",
		"2000",
		" ",
		"team: ",
		"nina",
		"magda",
		"caspers",
		"hendrik",
		"dino",
	];

	this.text2;
	this.index = 0;
	this.line = '';

    // //add some fancy transition effects
    // this.ready = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'text_ready');
    // this.ready.anchor.set(0.5,0.5);
    // this.ready.visible=false;
    // this.go = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'text_go');
    // this.go.anchor.set(0.5,0.5);
    // this.go.visible=false;
	//
    //add intro text
	//
    // this.input.onDown.add(this.onInputDown, this);
    // this.canContinueToNextState = true;

	this.text2 = this.game.add.text(32, this.game.world.height - 100, '', { font: "30pt Courier", fill: "#ff1779", stroke: "#c70078", strokeThickness: 2 });

    this.nextLine();

  }

  update() {}
	updateLine() {
		if (this.line.length < this.content[this.index].length) {
			this.line = this.content[this.index].substr(0, this.line.length + 1);
			// text.text = line;
			this.text2.text = this.line;
		}
		else {
			//  Wait 2 seconds then start a new line
			this.game.time.events.add(Phaser.Timer.SECOND * 1, this.nextLine, this);
		}
	}

	nextLine() {
		this.index++;
		if (this.index < this.content.length) {
			this.line = '';
			this.game.time.events.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
		}

	}
}

export default Menu;
