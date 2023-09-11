class Canvas {
  constructor(props) {
    this.create(props);
  }

  create(props) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = props.width || 100;
    this.canvas.height = props.height || 100;
    this.canvas.style.backgroundColor = props.bgcolor || '#fff';
    this.width = props.width;
    this.height = props.height;
    this.context = this.canvas.getContext('2d');
    props.parent.appendChild(this.canvas);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  drawCircle(x, y, radius, color) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = color;
    this.context.fill();
  }
}

export default Canvas;
