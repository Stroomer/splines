class Spline {
  constructor(props) {
    this.game = props.game;
    this.canvas = props.canvas;
    this.context = props.context;
    this.vertices = props.vertices || [];
    this.selected = 0;
    this.marker = 0.0;

    this.controlverticesize = 6;
    this.controlPointColorDefault = '#f00';
    this.controlPointColorSelected = '#ff0';

    this.velocity = 30.0;
  }

  toggleVertex(dir) {
    if (dir === 1) {
      this.selected =
        this.selected + 1 > this.vertices.length - 1 ? 0 : this.selected + 1;
    } else if (dir === -1) {
      this.selected =
        this.selected - 1 < 0 ? this.vertices.length - 1 : this.selected - 1;
    }
    this.game.refresh = true;
  }

  moveVertex(dirX, dirY, dt) {
    this.vertices[this.selected].x += dirX * (this.velocity * dt);
    this.vertices[this.selected].y += dirY * (this.velocity * dt);
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

  update() {}

  drawVertices() {
    const count = this.vertices.length;
    const width = this.controlverticesize;
    const height = this.controlverticesize;
    const color = this.controlPointColorDefault;
    for (let i = 0; i < count; i++) {
      const { x, y } = this.vertices[i];
      this.drawPoint({ x, y, width, height, color });
    }
  }

  drawPoint(props = null) {
    if (props === null) {
      props = {
        x: this.vertices[this.selected].x,
        y: this.vertices[this.selected].y,
        width: this.controlverticesize,
        height: this.controlverticesize,
        color: this.controlPointColorSelected,
      };
    }
    this.canvas.drawRect(props);
  }
}

export default Spline;
