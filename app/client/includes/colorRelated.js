// piece order:
//   - 1: L
//   - 2: long
//   - 3: square
//   - 4: reverse L
//   - 5: threeway
//   - 6: z
//   - 7: inverse z 

var pieceColors = [
    '#8f008f', // purple
    '#008f00', // green
    '#ff531b', // orange
    '#8f8f00', // yellow
    '#00008f', // blue
    '#008b8f', // cyan
    '#8f0000'  // red
];

var shadowColor = '#2c2c2c';

// this function converts a hexadecimal color code to RGBA with opacity

function convertColorHexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}


// this function returns the color of a piece from the colors[] array

function getPieceColor(colorIndex) {
    if (colorIndex == 'shadow') {
        return shadowColor;
    } else {
        var colorCalculated = colorIndex % pieceColors.length;
        return pieceColors[colorCalculated];
    }
}

module.exports = {
    convertColorHexToRGB,
    getPieceColor
}