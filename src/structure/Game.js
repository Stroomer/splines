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
        new Point2D({ x: 20, y: 41 }),
        new Point2D({ x: 30, y: 41 }),
        new Point2D({ x: 40, y: 41 }),
        new Point2D({ x: 50, y: 41 }),
        new Point2D({ x: 60, y: 41 }),
        new Point2D({ x: 70, y: 41 }),
        new Point2D({ x: 80, y: 41 }),
        new Point2D({ x: 90, y: 41 }),
        new Point2D({ x: 100, y: 41 }),
      ],
      canvas: this.canvas,
      context: this.canvas.context,
    });

    this.keyboardInput = new KeyboardInput();

    this.loop = new Loop((dt) => {
      this.tick(dt);
    });
  }

  tick(dt) {
    this.update(dt);
    this.draw();
  }

  update(dt) {
    if (this.keyboardInput.isReleased(KEY_X)) {
      this.path.setSelectedPoint(1);
    }

    if (this.keyboardInput.isReleased(KEY_Z)) {
      this.path.setSelectedPoint(-1);
    }

    if (this.keyboardInput.isPressed(KEY_LEFT)) {
      this.path.points[this.path.selectedPoint].x -= 30.0 * dt;
    }

    if (this.keyboardInput.isPressed(KEY_RIGHT)) {
      this.path.points[this.path.selectedPoint].x += 30.0 * dt;
    }

    if (this.keyboardInput.isPressed(KEY_UP)) {
      this.path.points[this.path.selectedPoint].y -= 30.0 * dt;
    }

    if (this.keyboardInput.isPressed(KEY_DOWN)) {
      this.path.points[this.path.selectedPoint].y += 30.0 * dt;
    }
  }

  draw() {
    this.canvas.clear();

    // Draw spline
    const points = parseFloat(this.path.points.length);
    for (let t = parseFloat(0.0); t < points; t += 0.005) {
      const pos = this.path.getSplinePoint(t, true);

      // draw some pixels here??
      this.canvas.drawPixel({ x: pos.tx, y: pos.ty });
    }

    // Draw control-points
    this.path.drawPoints();
    // Draw active control-point
    this.path.drawPoint();
  }
}

export default Game;
