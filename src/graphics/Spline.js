class Spline {
  constructor(props) {
    this.canvas = props.canvas;
    this.context = props.context;
    this.points = props.points || [];
    this.selectedPoint = 0;
    this.controlPointSize = 10;
    this.controlPointColorDefault = '#f00';
    this.controlPointColorSelected = '#ff0';
    this.marker = 0.0;
  }

  setSelectedPoint(dir) {
    switch (dir) {
      case 1:
        this.selectedPoint++;
        if (this.selectedPoint > this.points.length - 1) {
          this.selectedPoint = 0;
        }
        break;
      case -1:
        this.selectedPoint--;
        if (this.selectedPoint < 0) {
          this.selectedPoint = this.points.length - 1;
        }
        break;
      default:
        throw new Error('Invalid parameter');
    }
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
      p2 = (p1 + 1) % this.points.length;
      p3 = (p2 + 1) % this.points.length;
      p0 = p1 >= 1 ? p1 - 1 : this.points.length - 1;
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
        (this.points[p0].x * q1 +
          this.points[p1].x * q2 +
          this.points[p2].x * q3 +
          this.points[p3].x * q4)
    );

    const y = parseFloat(
      0.5 *
        (this.points[p0].y * q1 +
          this.points[p1].y * q2 +
          this.points[p2].y * q3 +
          this.points[p3].y * q4)
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
      p2 = (p1 + 1) % this.points.length;
      p3 = (p2 + 1) % this.points.length;
      p0 = p1 >= 1 ? p1 - 1 : this.points.length - 1;
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
        (this.points[p0].x * q1 +
          this.points[p1].x * q2 +
          this.points[p2].x * q3 +
          this.points[p3].x * q4)
    );

    const y = parseFloat(
      0.5 *
        (this.points[p0].y * q1 +
          this.points[p1].y * q2 +
          this.points[p2].y * q3 +
          this.points[p3].y * q4)
    );

    return { x, y };
  }

  update() {}

  drawPoints() {
    const count = this.points.length;
    const width = this.controlPointSize;
    const height = this.controlPointSize;
    const color = this.controlPointColorDefault;
    for (let i = 0; i < count; i++) {
      const { x, y } = this.points[i];
      this.drawPoint({ x, y, width, height, color });
    }
  }

  drawPoint(props = null) {
    if (props === null) {
      props = {
        x: this.points[this.selectedPoint].x,
        y: this.points[this.selectedPoint].y,
        width: this.controlPointSize,
        height: this.controlPointSize,
        color: this.controlPointColorSelected,
      };
    }
    this.canvas.drawRect(props);
  }
}

export default Spline;
