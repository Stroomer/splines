import Canvas from '../structure/Canvas';

class Font {
  static instance;
  static data = [];

  constructor() {
    if (Font.instance) {
      console.log('returning previous instance.');
      return Font.instance;
    }
    Font.instance = this;
    Font.data = Font.getData(Font.getRaw());
    Font.images = Font.getImages(Font.data);
  }

  static getImages(data) {
    const canvases = [];
    const temp = new Canvas({ width: 32, height: 32 });
    // Loop through all characters
    for (let c = 0; c < data.length; c++) {
      const char = data[c];
      // Create a canvas for each character
      const canvas = new Canvas({
        parent: document.getElementById('app'),
        width: char[0].length * 4,
        height: char.length * 4,
        bgcolor: 'black',
      });
      // Draw character on canvas
      for (let y = 0; y < char.length; y++) {
        for (let x = 0; x < char[y].length; x++) {
          if (Boolean(char[y][x])) {
            temp.drawPixel({ x, y, color: 'white' });
          }
        }
      }
      const cv = canvas.canvas;
      const w = cv.width;
      const h = cv.height;
      canvas.context.drawImage(temp.canvas, 0, 0, w, h, 0, 0, w * 4, h * 4);
      canvases.push(canvas);
      temp.clear();
    }
    return canvases;
  }

  static getCharacter(char) {
    const index = 0;
    return Font.data[index];
  }

  static getCharacters() {
    return Font.data;
  }

  static getData(raw) {
    const array = [...raw];
    // Loop door characters heen
    for (let char = 0; char < array.length; char++) {
      const charData = array[char];
      // Loop door rows van char heen
      for (let y = 0; y < charData.length; y++) {
        charData[y] = charData[y][0].split('');
        // Loop door row heen en vervang voor 0 of 1
        for (let x = 0; x < charData[y].length; x++) {
          charData[y][x] = charData[y][x] === '#' ? 1 : 0;
        }
      }
    }
    return array;
  }

  static getRaw() {
    return [
      [
        ['  ####  '],
        [' ##  ## '],
        ['##    ##'],
        ['##    ##'],
        ['########'],
        ['##    ##'],
        ['##    ##'],
        ['##    ##'],
      ],
      [
        ['####### '],
        ['##    ##'],
        ['##    ##'],
        ['####### '],
        ['##    ##'],
        ['##    ##'],
        ['##    ##'],
        ['####### '],
      ],
      [
        [' ###### '],
        ['##    ##'],
        ['##    ##'],
        ['##      '],
        ['##      '],
        ['##    ##'],
        ['##    ##'],
        [' ###### '],
      ],
    ];
  }
}

export default Font;

// function toImages(data) {
//   // Loop door characters heen
//   for (let char = 0; char < data.length; char++) {
//     const canvas = new Canvas({
//       width: 320,
//       height: 180,
//       bgcolor: '#000',
//     });
//   }
// }

// const fontData = toArray(raw);
// const fontImages = toImages(fontData);
