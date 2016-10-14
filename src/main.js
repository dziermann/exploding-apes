import Boot from './states/boot';
import Game from './states/game';
import Menu from './states/menu';
import Background from './states/background';
import Preloader from './states/preloader';

// new Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig)


const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'exploding-apes-game');

game.antialias = false;
game.state.add('boot', new Boot());
game.state.add('preloader', new Preloader());
game.state.add('background', new Background());
game.state.add('menu', new Menu());
game.state.add('game', new Game());

game.state.start('boot');
