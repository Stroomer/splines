import Canvas from './../structure/Canvas';

class Text {
  constructor(props) {
    this.game = props.game;
    this.canvas = props.canvas;
    this.context = props.context;
    this.text = props.text;
  }

  draw() {
    const char = fontData[0];
    for (let y = 0; y < char.length; y++) {
      for (let x = 0; x < char[y].length; x++) {
        //console.log(char);

        if (char[y][x] === 1) {
          this.canvas.drawpixel({ x, y, color: 'purple' });
        }
      }
    }
  }
}

export default Text;
