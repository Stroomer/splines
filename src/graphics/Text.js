class Text {
  constructor(canvas, fontData) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.fontData = fontData; // Font data should be a 2D array representing the font characters
    this.charWidth = fontData[0][0].length;
    this.charHeight = fontData[0].length;
  }

  renderText(text, x, y, scale = 1, color = 'white') {
    this.ctx.fillStyle = color;

    // Loop through each character in the text
    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      // Get the character's index in the font data (ASCII value)
      const charIndex = char.charCodeAt(0);

      // Check if the character is within the font data range
      if (charIndex >= 32 && charIndex <= 126) {
        const charData = this.fontData[charIndex - 32]; // Adjust for ASCII offset
        if (charData) {
          // Render the character using the font data
          for (let row = 0; row < this.charHeight; row++) {
            for (let col = 0; col < this.charWidth; col++) {
              if (charData[row][col] === '#') {
                // Draw a pixel at the scaled position
                this.ctx.fillRect(
                  x + col * scale,
                  y + row * scale,
                  scale,
                  scale
                );
              }
            }
          }
        }
      }

      // Move the drawing position to the right for the next character
      x += this.charWidth * scale;
    }
  }
}

export default Text;
// Here's how you can use this PixelFontRenderer class:

// First, create an HTML <canvas> element in your HTML document:
// html
// Copy code
// <canvas id="myCanvas" width="800" height="600"></canvas>
// Then, create a 2D array representing your custom pixel font. Each character should be defined as a grid of # for pixels. You can define characters from ASCII 32 (space) to 126 (tilde), as shown in the class.

// Instantiate the PixelFontRenderer class and use it to render text to the canvas:

// javascript
// Copy code
// const canvas = document.getElementById('myCanvas');
// const fontData = [
//   // Define your custom font data here (2D array).
//   // Example: 'A' character
//   [
//     '  ##  ',
//     ' #  # ',
//     ' #  # ',
//     ' #### ',
//     ' #  # ',
//     ' #  # ',
//     '      ',
//   ],
//   // ... other characters ...
// ];

// const pixelFontRenderer = new PixelFontRenderer(canvas, fontData);

// // Render text to the canvas
// pixelFontRenderer.renderText('Hello, World!', 10, 10, 2, 'white');
