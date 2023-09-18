import Canvas from './Canvas.js';
import Loop from './Loop.js';
import Spline from '../graphics/Spline.js';
import Keyboard from '../structure/Keyboard.js';
import Storage from '../structure/Storage.js';
import Text from '../graphics/Text.js';

class Game {
  constructor() {
    this.canvas = new Canvas({
      parent: document.getElementById('app'),
      width: 320,
      height: 180,
      bgcolor: '#000',
      showPosition: true,
    });

    this.fontData = [
      ['  ##  ', ' #  # ', ' #  # ', ' #### ', ' #  # ', ' #  # ', '      '],
    ];

    this.txt = new Text(this.canvas.canvas, this.fontData);

    // // Render text to the canvas
    this.txt.renderText('Hello, World!', 10, 10, 2, 'white');

    this.refresh = true;
    this.keyboard = new Keyboard();
    this.storage = new Storage();
    this.spline = new Spline({
      vertices: this.storage.load(),
      canvas: this.canvas,
      context: this.canvas.context,
      keyboard: this.keyboard,
      storage: this.storage,
      showMarkerPosition: true,
      game: this,
    });

    this.loop = new Loop((dt) => {
      this.tick(dt);
    });
  }

  tick(dt) {
    this.update(dt);
    this.draw();
  }

  update(dt) {
    this.spline.update(dt);
  }

  draw() {
    if (this.refresh) {
      // Clear canvas
      this.canvas.clear();
      // Draw spline
      this.spline.draw();
      // Draw of this frame is complete
      this.refresh = false;
    }
  }
}

export default Game;
