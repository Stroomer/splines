class Spline {
  constructor(props) {
    this.canvas = props.canvas;
    this.context = props.context;
    this.points = props.points || [];
    this.selectedPoint = 0;
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
