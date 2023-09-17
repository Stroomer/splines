import Canvas from './Canvas.js';
import Loop from './Loop.js';
import Spline from '../graphics/Spline.js';
import Vertex from '../graphics/Vertex.js';
import Keyboard from '../structure/Keyboard.js';

class Game {
  constructor() {
    this.canvas = new Canvas({
      parent: document.getElementById('app'),
      width: 320,
      height: 180,
      bgcolor: '#000',
      showPosition: true,
    });

    this.refresh = true;
    this.keyboard = new Keyboard();

    this.spline = new Spline({
      vertices: [
        new Vertex({ x: 10, y: 41 }),
        new Vertex({ x: 30, y: 41 }),
        new Vertex({ x: 50, y: 41 }),
        new Vertex({ x: 70, y: 41 }),
        new Vertex({ x: 90, y: 41 }),
        new Vertex({ x: 110, y: 41 }),
        new Vertex({ x: 130, y: 41 }),
        new Vertex({ x: 150, y: 41 }),
        new Vertex({ x: 170, y: 41 }),
        new Vertex({ x: 190, y: 41 }),
      ],
      canvas: this.canvas,
      context: this.canvas.context,
      keyboard: this.keyboard,
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

    // if (this.keyboardInput.isReleased(KEY_X)) {
    //   this.spline.toggleVertex(1);
    // }

    // if (this.keyboardInput.isReleased(KEY_Z)) {
    //   this.spline.toggleVertex(-1);
    // }

    // if (this.keyboardInput.isPressed(KEY_LEFT)) {
    //   this.spline.moveVertex(-1, 0, dt);
    // }

    // if (this.keyboardInput.isPressed(KEY_RIGHT)) {
    //   this.spline.moveVertex(1, 0, dt);
    // }

    // if (this.keyboardInput.isPressed(KEY_UP)) {
    //   this.spline.moveVertex(0, -1, dt);
    // }

    // if (this.keyboardInput.isPressed(KEY_DOWN)) {
    //   this.spline.moveVertex(0, 1, dt);
    // }

    // if (this.keyboardInput.isPressed(KEY_A)) {
    //   this.moveMarker(-1, dt);
    // }

    // if (this.keyboardInput.isPressed(KEY_S)) {
    //   this.moveMarker(1, dt);
    // }

    // if (this.spline.marker >= parseFloat(this.spline.vertices.length)) {
    //   this.spline.marker -= parseFloat(this.spline.vertices.length);
    //   this.refresh = true;
    // } else if (this.spline.marker < parseFloat(0.0)) {
    //   this.spline.marker += parseFloat(this.spline.vertices.length);
    //   this.refresh = true;
    // }
  }

  draw() {
    if (this.refresh) {
      this.canvas.clear();

      // // Draw spline
      this.spline.draw();

      // const color = 'white';
      // const vertices = parseFloat(this.spline.vertices.length);
      // for (let t = 0.0; t < vertices; t += 0.005) {
      //   const { x, y } = this.spline.getSplinePoint(parseFloat(t), true);
      //   this.canvas.drawPixel({ x, y, color });
      // }

      // // Draw control-vertices
      //this.spline.drawVertices();
      // // Draw active control-point
      // this.spline.drawPoint();
      // // Draw agent
      // const p1 = this.spline.getSplinePoint(
      //   parseFloat(this.spline.marker.position),
      //   true
      // );

      // const g1 = this.spline.getSplineGradient(
      //   parseFloat(this.spline.marker.position),
      //   true
      // );

      // const r = parseFloat(Math.atan2(-g1.y, g1.x));
      // const segment = 15.0;

      // const x1 = segment * Math.sin(r) + p1.x;
      // const y1 = segment * Math.cos(r) + p1.y;
      // const x2 = -segment * Math.sin(r) + p1.x;
      // const y2 = -segment * Math.cos(r) + p1.y;

      // this.canvas.drawLine({ x1, y1, x2, y2, color: 'purple' });

      this.refresh = false;
    }
  }
}

export default Game;
