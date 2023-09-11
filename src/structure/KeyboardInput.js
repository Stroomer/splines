import {
  KEY_DOWN,
  KEY_UP,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_X,
  KEY_Y,
  KEY_Z,
} from '../helpers/consts';

class KeyboardInput {
  constructor() {
    this.keys = {
      ArrowDown: KEY_DOWN,
      ArrowUp: KEY_UP,
      ArrowLeft: KEY_LEFT,
      ArrowRight: KEY_RIGHT,
      s: KEY_DOWN,
      w: KEY_UP,
      a: KEY_LEFT,
      d: KEY_RIGHT,
      x: KEY_X,
      y: KEY_Y,
      z: KEY_Z,
      X: KEY_X,
      Y: KEY_Y,
      Z: KEY_Z,
      [KEY_LEFT]: KEY_LEFT,
      [KEY_RIGHT]: KEY_RIGHT,
      [KEY_UP]: KEY_UP,
      [KEY_DOWN]: KEY_DOWN,
    };

    this.keysPressed = [];
    this.keysReleased = [];

    this.keyDownHandler = (e) => {
      const key = this.keys[e.key];

      //console.log(`key down: ${key}`);

      if (key && this.keysPressed.indexOf(key) === -1) {
        this.keysPressed.unshift(key);
      }
    };

    this.keyUpHandler = (e) => {
      const key = this.keys[e.key];
      const index = this.keysPressed.indexOf(key);
      if (key && index > -1) {
        this.keysPressed.splice(index, 1);
        this.keysReleased.unshift(key);
      }
    };

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  isPressed(k) {
    const key = this.keys[k];
    return Boolean(key && this.keysPressed.indexOf(key) > -1);
  }

  isReleased(k) {
    const key = this.keys[k];
    const index = this.keysReleased.indexOf(key);
    const released = Boolean(key && index > -1);
    if (released) {
      this.keysReleased.splice(index, 1);
    }
    return released;
  }

  unbind() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }
}

export default KeyboardInput;
