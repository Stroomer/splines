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

  drawCircle(props) {
    const { x, y, radius, color } = props;
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = color;
    this.context.fill();
  }

  drawRect(props) {
    const { x, y, width, height, color } = props;
    this.context.fillStyle = color;
    this.context.fillRect(x - width / 2, y - height / 2, width, height);
  }

  drawPixel(props) {
    const { x, y } = props;
    const color = '#fff';
    this.context.fillStyle = color;
    this.context.fillRect(x, y, 1, 1);
  }

  drawLine(props) {
    const { x1, y1, x2, y2, color } = props;
    this.context.strokeStyle = color;
    this.context.strokeWidth = 10;
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }
}

export default Canvas;
