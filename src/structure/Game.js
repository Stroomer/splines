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
  KEY_A,
  KEY_S,
} from '../helpers/consts.js';

class Game {
  constructor() {
    this.canvas = new Canvas({
      parent: document.getElementById('app'),
      width: 320,
      height: 180,
      bgcolor: '#000',
    });

    this.path = new Spline({
      points: [
        new Point2D({ x: 10, y: 41 }),
        new Point2D({ x: 30, y: 41 }),
        new Point2D({ x: 50, y: 41 }),
        new Point2D({ x: 70, y: 41 }),
        new Point2D({ x: 90, y: 41 }),
        new Point2D({ x: 110, y: 41 }),
        new Point2D({ x: 130, y: 41 }),
        new Point2D({ x: 150, y: 41 }),
        new Point2D({ x: 170, y: 41 }),
        new Point2D({ x: 190, y: 41 }),
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

    if (this.keyboardInput.isPressed(KEY_A)) {
      this.path.marker -= 5.0 * dt;
    }

    if (this.keyboardInput.isPressed(KEY_S)) {
      this.path.marker += 5.0 * dt;
    }

    if (this.path.marker >= parseFloat(this.path.points.length)) {
      this.path.marker -= parseFloat(this.path.points.length);
    }

    if (this.path.marker < parseFloat(0.0)) {
      this.path.marker += parseFloat(this.path.points.length);
    }
  }

  draw() {
    this.canvas.clear();

    // Draw spline
    const points = parseFloat(this.path.points.length);
    for (let t = 0.0; t < points; t += 0.005) {
      const { x, y } = this.path.getSplinePoint(parseFloat(t), true);
      this.canvas.drawPixel({ x, y });
    }

    // Draw control-points
    this.path.drawPoints();
    // Draw active control-point
    this.path.drawPoint();
    // Draw agent
    const p1 = this.path.getSplinePoint(parseFloat(this.path.marker), true);
    const g1 = this.path.getSplineGradient(parseFloat(this.path.marker), true);

    const r = parseFloat(Math.atan2(-g1.y, g1.x));

    console.log(r);

    const x1 = 5.0 * Math.sin(r) + p1.x;
    const y1 = 5.0 * Math.cos(r) + p1.y;
    const x2 = -5.0 * Math.sin(r) + p1.x;
    const y2 = -5.0 * Math.cos(r) + p1.y;

    const color = 'purple';

    this.canvas.drawLine({ x1, y1, x2, y2, color });
  }
}

export default Game;
