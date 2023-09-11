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
  KEY_Z,
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
    if (this.keyboardInput.isReleased(KEY_X)) {
      this.path.setSelectedPoint(1);
      console.log('increment');
    }

    if (this.keyboardInput.isReleased(KEY_Z)) {
      this.path.setSelectedPoint(-1);
      console.log('decrement');
    }

    if (this.keyboardInput.isPressed(KEY_LEFT)) {
      console.log('left');

      //this.path.points[this.path.selectedPoint].x -= 30.0;
    }
  }

  draw() {
    this.canvas.clear();

    this.path.draw();
  }
}

export default Game;
