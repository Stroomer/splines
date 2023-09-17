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
    this.selected = 0;

    this.knot = {
      color: '#f00',
      colorSel: '#ff0',
      selected: 0,
      width: 6,
      height: 6,
      velocity: 30.0,
    };
    this.marker = { position: 0.0, velocity: 5.0, size: 15.0 };
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
    this.marker.position += dir * (this.marker.velocity * dt);

    if (this.marker.position >= this.vertices.length) {
      console.log(this.marker.position);
      this.marker.position = parseFloat(
        this.marker.position - this.vertices.length
      );
    } else if (this.marker.position < 0.0) {
      console.log(this.marker.position);
      //this.marker.position += this.vertices.length;
      this.marker.position = parseFloat(
        this.marker.position + this.vertices.length
      );
    }

    // TODO: fix this, gaat niet goed, tekenprobleem? lijkt alsof agent weer terug wordt gezet naar begin positie!!!????

    this.game.refresh = true;
  }

  getSplinePoint(_t, looped = false) {
    let p0, p1, p2, p3;

    if (!looped) {
      p1 = parseInt(_t) + 1;
      p2 = p1 + 1;
      p3 = p2 + 1;
      p0 = p1 - 1;
    } else {
      p1 = parseInt(_t);
      p2 = (p1 + 1) % this.vertices.length;
      p3 = (p2 + 1) % this.vertices.length;
      p0 = p1 >= 1 ? p1 - 1 : this.vertices.length - 1;
    }

    const t = parseFloat(_t) - parseInt(_t);
    const tt = parseFloat(t * t);
    const ttt = parseFloat(tt * t);

    const q1 = parseFloat(-ttt + 2.0 * tt - t);
    const q2 = parseFloat(3.0 * ttt - 5.0 * tt + 2.0);
    const q3 = parseFloat(-3.0 * ttt + 4.0 * tt + t);
    const q4 = parseFloat(ttt - tt);

    const x = parseFloat(
      0.5 *
        (this.vertices[p0].x * q1 +
          this.vertices[p1].x * q2 +
          this.vertices[p2].x * q3 +
          this.vertices[p3].x * q4)
    );

    const y = parseFloat(
      0.5 *
        (this.vertices[p0].y * q1 +
          this.vertices[p1].y * q2 +
          this.vertices[p2].y * q3 +
          this.vertices[p3].y * q4)
    );

    return { x, y };
  }

  getSplineGradient(_t, looped = false) {
    let p0, p1, p2, p3;

    if (!looped) {
      p1 = parseInt(_t) + 1;
      p2 = p1 + 1;
      p3 = p2 + 1;
      p0 = p1 - 1;
    } else {
      p1 = parseInt(_t);
      p2 = (p1 + 1) % this.vertices.length;
      p3 = (p2 + 1) % this.vertices.length;
      p0 = p1 >= 1 ? p1 - 1 : this.vertices.length - 1;
    }

    const t = parseFloat(_t) - parseInt(_t);
    const tt = parseFloat(t * t);
    const ttt = parseFloat(tt * t);

    const q1 = parseFloat(-3.0 * tt + 4.0 * t - 1);
    const q2 = parseFloat(9.0 * tt - 10.0 * t);
    const q3 = parseFloat(-9.0 * tt + 8.0 * t + 1.0);
    const q4 = parseFloat(3.0 * tt - 2.0 * t);

    const x = parseFloat(
      0.5 *
        (this.vertices[p0].x * q1 +
          this.vertices[p1].x * q2 +
          this.vertices[p2].x * q3 +
          this.vertices[p3].x * q4)
    );

    const y = parseFloat(
      0.5 *
        (this.vertices[p0].y * q1 +
          this.vertices[p1].y * q2 +
          this.vertices[p2].y * q3 +
          this.vertices[p3].y * q4)
    );

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
    }

    if (this.keyboard.isPressed(KEY_S)) {
      this.moveMarker(1, dt);
    }
  }

  draw() {
    this.drawSegments();
    this.drawControlPoints();
    this.drawSelectedControlPoint();
    this.drawAgent();
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

    const p1 = this.getSplinePoint(parseFloat(position), true);
    const g1 = this.getSplineGradient(parseFloat(position), true);
    const r = parseFloat(Math.atan2(-g1.y, g1.x));
    const x1 = size * Math.sin(r) + p1.x;
    const y1 = size * Math.cos(r) + p1.y;
    const x2 = -size * Math.sin(r) + p1.x;
    const y2 = -size * Math.cos(r) + p1.y;

    this.canvas.drawLine({ x1, y1, x2, y2, color: 'purple' });
  }
}

export default Spline;
