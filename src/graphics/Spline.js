class Spline {
  constructor(props) {
    this.canvas = props.canvas;
    this.context = props.context;
    this.points = props.points || [];
    this.selectedPoint = 0;
  }

  setSelectedPoint(dir) {
    this.selectedPoint += dir;
    switch (dir) {
      case 1:
        if (this.selectedPoint >= this.points.length) {
          this.selectedPoint = 0;
        }
        break;
      case -1:
        if (this.selectedPoint < 0) {
          this.selectedPoint = this.points.length - 1;
        }
        break;
      default:
        throw new Error("Invalid parameter 'dir'");
    }
    console.log(dir, this.selectedPoint, this.points.length);
  }

  incrementSelectedPoint() {
    this.selectedPoint++;
    if (this.selectedPoint >= this.points.length) {
      this.selectedPoint = 0;
    }
  }

  decrementSelectedPoint() {
    this.selectedPoint--;
    if (this.selectedPoint < 0) {
      this.selectedPoint = this.points.length - 1;
    }
  }

  update() {}

  draw() {
    const pRadius = 10;
    const pColor = '#f00';
    const pCount = this.points.length;
    for (let i = 0; i < pCount; i++) {
      const { x, y } = this.points[i];

      this.canvas.drawCircle(x, y, pRadius, pColor);

      // console.log(point.x, point.y);
    }
  }
}

export default Spline;
