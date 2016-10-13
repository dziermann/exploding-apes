 import Boot from './states/boot';
 import Game from './states/game';
 import Background from './states/background';
 import Preloader from './states/preloader';


const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'exploding-apes-game');

game.state.add('boot', new Boot());
game.state.add('preloader', new Preloader());
game.state.add('background', new Background());
game.state.add('game', new Game());

game.state.start('boot');
