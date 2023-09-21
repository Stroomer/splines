import Canvas from './Canvas.js';
import Loop from './Loop.js';
import Spline from '../graphics/Spline.js';
import Keyboard from '../structure/Keyboard.js';
import Storage from '../structure/Storage.js';
import Text from '../graphics/Text.js';
import Font from '../graphics/Font.js';

class Game {
  constructor() {
    this.canvas = new Canvas({
      parent: document.getElementById('app'),
      id: 'game',
      width: 320,
      height: 180,
      bgcolor: '#000',
    });

    this.font = new Font();

    // this.markerPosText = new Text({
    //   x: 10,
    //   y: 10,
    //   canvas: this.canvas,
    //   context: this.canvas.context,
    // });

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

      // Draw marker position
      //this.markerPosText.draw();

      //const characters = Font.getCharacters(); // Get'em all!
      const character = Font.getCharacter('A');

      const color = 'red';

      const startX = 148;
      const startY = 170;

      for (let y = 0; y < character.length; y++) {
        for (let x = 0; x < character[y].length; x++) {
          if (Boolean(character[y][x])) {
            this.canvas.drawPixel({
              x: startX + x,
              y: startY + y,
              color: color,
            });
          }
        }
      }

      // Draw of this frame is complete
      this.refresh = false;
    }
  }
}

export default Game;
