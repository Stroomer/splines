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

class Spline {
  constructor(props) {
    this.game = props.game;
    this.keyboard = props.keyboard;
    this.canvas = props.canvas;
    this.context = props.context;
    this.vertices = props.vertices || [];
    this.storage = props.storage;
    this.showMarkerPosition = props.showMarkerPosition || false;

    this.knot = {
      color: '#f00',
      colorSel: '#ff0',
      selected: 0,
      width: 6,
      height: 6,
      velocity: 30.0,
    };

    this.marker = { position: 0.0, velocity: 2.2, size: 15.0 };
  }

  toggleVertex(dir) {
    if (dir === 1) {
      this.knot.selected =
        this.knot.selected + 1 > this.vertices.length - 1
          ? 0
          : this.knot.selected + 1;
    } else if (dir === -1) {
      this.knot.selected =
        this.knot.selected - 1 < 0
          ? this.vertices.length - 1
          : this.knot.selected - 1;
    }
    this.game.refresh = true;
  }

  moveVertex(dirX, dirY, dt) {
    const { selected, velocity } = this.knot;
    this.vertices[selected].x += dirX * (velocity * dt);
    this.vertices[selected].y += dirY * (velocity * dt);
    this.game.refresh = true;
  }

  moveMarker(dir, dt) {
    if (this.marker.position + dir * this.marker.velocity * dt < 0) {
      this.marker.position = this.vertices.length;
    }
    this.marker.position += dir * (this.marker.velocity * dt);
    this.marker.position %= this.vertices.length;

    this.game.refresh = true;
  }

  getSplinePoint(_t, looped = false) {
    let p0, p1, p2, p3;

    if (!looped) {
      p1 = (_t + 1) | 0;
      p2 = (p1 + 1) | 0;
      p3 = (p2 + 1) | 0;
      p0 = (p1 - 1) | 0;
    } else {
      p1 = _t | 0;
      p2 = (p1 + 1) % this.vertices.length | 0;
      p3 = (p2 + 1) % this.vertices.length | 0;
      p0 = (p1 >= 1 ? p1 - 1 : this.vertices.length - 1) | 0;
    }

    const t = _t - (_t | 0);
    const tt = t * t;
    const ttt = tt * t;

    const q1 = -ttt + 2.0 * tt - t;
    const q2 = 3.0 * ttt - 5.0 * tt + 2.0;
    const q3 = -3.0 * ttt + 4.0 * tt + t;
    const q4 = ttt - tt;

    const x =
      0.5 *
      (this.vertices[p0].x * q1 +
        this.vertices[p1].x * q2 +
        this.vertices[p2].x * q3 +
        this.vertices[p3].x * q4);

    const y =
      0.5 *
      (this.vertices[p0].y * q1 +
        this.vertices[p1].y * q2 +
        this.vertices[p2].y * q3 +
        this.vertices[p3].y * q4);

    return { x, y };
  }

  getSplineGradient(_t, looped = false) {
    let p0, p1, p2, p3;

    if (!looped) {
      p1 = (_t + 1) | 0;
      p2 = (p1 + 1) | 0;
      p3 = (p2 + 1) | 0;
      p0 = (p1 - 1) | 0;
    } else {
      p1 = _t | 0;
      p2 = (p1 + 1) % this.vertices.length | 0;
      p3 = (p2 + 1) % this.vertices.length | 0;
      p0 = (p1 >= 1 ? p1 - 1 : this.vertices.length - 1) | 0;
    }

    const t = _t - (_t | 0);
    const tt = t * t;
    const ttt = tt * t;

    const q1 = -3.0 * tt + 4.0 * t - 1;
    const q2 = 9.0 * tt - 10.0 * t;
    const q3 = -9.0 * tt + 8.0 * t + 1.0;
    const q4 = 3.0 * tt - 2.0 * t;

    const x =
      0.5 *
      (this.vertices[p0].x * q1 +
        this.vertices[p1].x * q2 +
        this.vertices[p2].x * q3 +
        this.vertices[p3].x * q4);

    const y =
      0.5 *
      (this.vertices[p0].y * q1 +
        this.vertices[p1].y * q2 +
        this.vertices[p2].y * q3 +
        this.vertices[p3].y * q4);

    return { x, y };
  }

  update(dt) {
    if (this.keyboard.isReleased(KEY_X)) {
      this.toggleVertex(1);
    }

    if (this.keyboard.isReleased(KEY_Z)) {
      this.toggleVertex(-1);
    }

    if (this.keyboard.isPressed(KEY_LEFT)) {
      this.moveVertex(-1, 0, dt);
    }

    if (this.keyboard.isPressed(KEY_RIGHT)) {
      this.moveVertex(1, 0, dt);
    }

    if (this.keyboard.isPressed(KEY_UP)) {
      this.moveVertex(0, -1, dt);
    }

    if (this.keyboard.isPressed(KEY_DOWN)) {
      this.moveVertex(0, 1, dt);
    }

    if (this.keyboard.isPressed(KEY_A)) {
      this.moveMarker(-1, dt);
    } else if (this.keyboard.isPressed(KEY_S)) {
      this.moveMarker(1, dt);
    }

    if (
      this.keyboard.isReleased(KEY_LEFT) ||
      this.keyboard.isReleased(KEY_RIGHT) ||
      this.keyboard.isReleased(KEY_UP) ||
      this.keyboard.isReleased(KEY_DOWN)
    ) {
      this.storage.save(this.vertices);
    }
  }

  draw() {
    this.drawSegments();
    this.drawControlPoints();
    this.drawSelectedControlPoint();
    this.drawAgent();
    //this.drawMarkerText();
  }

  drawMarkerText() {
    const x = 20;
    const y = 20;
    const value = 'hello world';
    const color = 'white';

    this.canvas.drawText({ x, y, color, value });
  }

  drawSegments() {
    for (let t = 0.0; t < this.vertices.length; t += 0.005) {
      const { x, y } = this.getSplinePoint(parseFloat(t), true);
      this.canvas.drawPixel({ x, y, color: 'white' });
    }
  }

  drawControlPoints() {
    const { width, height, color } = this.knot;
    for (let i = 0; i < this.vertices.length; i++) {
      const { x, y } = this.vertices[i];
      this.canvas.drawRect({ x, y, width, height, color });
    }
  }

  drawSelectedControlPoint() {
    const { width, height, colorSel, selected } = this.knot;
    const selectedControlPoint = this.vertices[selected];
    const { x, y } = selectedControlPoint;
    this.canvas.drawRect({ x, y, width, height, color: colorSel });
  }

  drawAgent() {
    const { position, size } = this.marker;

    const p1 = this.getSplinePoint(position, true);
    const g1 = this.getSplineGradient(position, true);
    const r = Math.atan2(-g1.y, g1.x);
    const x1 = size * Math.sin(r) + p1.x;
    const y1 = size * Math.cos(r) + p1.y;
    const x2 = -size * Math.sin(r) + p1.x;
    const y2 = -size * Math.cos(r) + p1.y;

    //console.log(x1, y1, x2, y2);

    this.canvas.drawLine({ x1, y1, x2, y2, color: 'purple' });
  }
}

export default Spline;
