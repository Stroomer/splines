import Canvas from './Canvas.js';
import Loop from './Loop.js';
import Spline from '../graphics/Spline.js';
import Point2D from '../graphics/Point2D.js';
import KeyboardInput from '../structure/KeyboardInput.js';
import {
  KEY_DOWN,
  KEY_UP,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_X,
  KEY_Y,
} from '../helpers/consts.js';

class Game {
  constructor() {
    this.canvas = new Canvas({
      parent: document.getElementById('app'),
      width: 500,
      height: 500,
      bgcolor: '#000',
    });

    this.path = new Spline({
      points: [
        new Point2D({ x: 10, y: 41 }),
        new Point2D({ x: 40, y: 41 }),
        new Point2D({ x: 70, y: 41 }),
        new Point2D({ x: 100, y: 41 }),
      ],
      canvas: this.canvas,
      context: this.canvas.context,
    });

    this.keyboardInput = new KeyboardInput();

    this.loop = new Loop(() => {
      this.tick();
    });
  }

  tick() {
    this.update();
    this.draw();
  }

  update() {
    const keyPressed = this.keyboardInput.getKey;
    if (Boolean(keyPressed)) {
      switch (keyPressed) {
        case KEY_DOWN:
          console.log('DOWN');
          break;
        case KEY_UP:
          console.log('UP');
          break;
        case KEY_LEFT:
          console.log('LEFT');
          break;
        case KEY_RIGHT:
          console.log('RIGHT');
          break;
        case KEY_X:
          console.log('X');
          break;
        case KEY_Y:
          console.log('Y');
          break;
      }
    }
  }

  draw() {
    this.canvas.clear();

    this.path.draw();
  }
}

export default Game;
