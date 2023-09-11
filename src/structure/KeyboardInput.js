import {
  KEY_DOWN,
  KEY_UP,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_X,
  KEY_Y,
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
    };

    this.currentKeysPressed = [];

    this.keyDownHandler = (e) => {
      const key = this.keys[e.key];
      if (key && this.currentKeysPressed.indexOf(key) === -1) {
        this.currentKeysPressed.unshift(key);
      }
    };

    this.keyUpHandler = (e) => {
      const key = this.keys[e.key];
      const index = this.currentKeysPressed.indexOf(key);
      if (index > -1) {
        this.currentKeysPressed.splice(index, 1);
      }
    };

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  get getKey() {
    return this.currentKeysPressed[0];
  }

  unbind() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }
}

export default KeyboardInput;
