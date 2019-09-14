var colors = [
    '#ff0000', 
    '#00ff00', 
    '#0000ff', 
    '#00ffff', 
    '#800080', 
    '#a52a2a', 
    '#808080'
];

var shadowColor = '#2c2c2c';

// this function converts a hexadecimal color code to RGBA with opacity

function hexToRGB(hex, alpha) {
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
    var colorCalculated = colorIndex % colors.length;
    return colors[colorCalculated];
}

module.exports = {
    colors,
    shadowColor,
    hexToRGB,
    getPieceColor
}