import './style.css';
import Game from './src/structure/Game.js';

let game;

window.addEventListener('load', () => {
  game = new Game();
});
