var pieceColors = [
    '#ff0000', // red
    '#00ff00', // green
    '#0000ff', // blue
    '#00ffff', // cyan
    '#800080', // purple
    '#a52a2a', // brown
    '#808080'  // grey
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