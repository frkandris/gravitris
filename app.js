console.log("start");

var pixelSize = 20;
var playAreaWidth = 16 * pixelSize;
var playAreaHeight = 20 * pixelSize;
var fallingSpeed = 1;

var pieceMap = {
    0 : [
        { 
            0 : [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0]
            ]
        },
        { 
            1 : [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [1, 0, 0, 0]
            ]
        },
        { 
            2 : [
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        },
        { 
            3 : [
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        }
    ],
    1 : [
        { 
            0 : [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        },
        { 
            1 : [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0]
            ]
        }
    ],
    2 : [
        { 
            0 : [
                [0, 1, 1, 0],
                [0, 1, 1, 0]
            ]
        }
    ],
    3 : [
        { 
            0 : [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 1, 1, 0]
            ]
        },
        { 
            1 : [
                [0, 1, 0, 0],
                [0, 1, 1, 1],
                [0, 0, 0, 0]
            ]
        },
        { 
            2 : [
                [0, 0, 1, 1],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ]
        },
        { 
            3 : [
                [0, 0, 0, 0],
                [0, 1, 1, 1],
                [0, 0, 0, 1]
            ]
        }
    ],
    4 : [
        { 
            0 : [
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        },
        { 
            1 : [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0]
            ]
        },
        { 
            2 : [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 0, 0]
            ]
        },
        { 
            3 : [
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        }
    ],
    5 : [
        { 
            0 : [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0]
            ]
        },
        { 
            1 : [
                [0, 0, 1, 1],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        }
    ],
    6 : [
        { 
            0 : [
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0]
            ]
        },
        { 
            1 : [
                [0, 1, 1, 0],
                [0, 0, 1, 1],
                [0, 0, 0, 0]
            ]
        }
    ],
};

var calculationArea = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var colors = [
    'red', 'green', 'blue', 'cyan', 'purple', 'brown', 'grey'
]

    function checkKeyboardInput(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            // up arrow
            // console.log('up');
            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            // console.log("numberOfRotations: " + numberOfRotations);
            // console.log("rotationIndex: " + window.rotationIndex);
            window.rotationIndex--;
            if (window.rotationIndex < 0) {
                window.rotationIndex = numberOfRotations - 1;
            };
            console.log("rotationIndex: " + window.rotationIndex);
        }
        else if (e.keyCode == '40') {
            // console.log('down');
            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            // console.log("numberOfRotations: " + numberOfRotations);
            // console.log("rotationIndex: " + window.rotationIndex);
            window.rotationIndex++;
            if (window.rotationIndex == numberOfRotations) {
                window.rotationIndex = 0;
            };
            console.log("rotationIndex: " + window.rotationIndex);
        }
        else if (e.keyCode == '37') {
            // left arrow
            // console.log('left');
            xPlayArea = xPlayArea - pixelSize;
        }
        else if (e.keyCode == '39') {
            // right arrow
            // console.log('right');
            xPlayArea = xPlayArea + pixelSize;
        }
        else if (e.keyCode == '32 ') {
            selectANewPiece();
        }
    }

    function selectANewPiece(){
        var values = selectAPieceAndRotationRandomly();
        window.pieceIndex = values[0];
        window.rotationIndex = values[1];
        xPlayArea = (playAreaWidth / 2) - (2 * pixelSize);
        yPlayArea = 0 * pixelSize;
    }

    function drawCalculationArea(){

        var numberOfRows = calculationArea.length;
        var numberOfColumns = calculationArea[0].length;
        // console.log("numberOfRows: " + numberOfRows);
        // console.log("numberOfColumns: " + numberOfColumns);

        var c = document.getElementById("calculationAreaCanvas");
        var ctx = c.getContext("2d");
        
        ctx.clearRect(0, 0, c.width, c.height);

        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                isRectangleFilled = calculationArea[i][j];
                if (isRectangleFilled > 0) {
                    ctx.fillStyle = colors[isRectangleFilled - 1];
                    ctx.fillRect(j * pixelSize, i * pixelSize, (pixelSize - 1), (pixelSize - 1));
                } 
            }
        }
    }

    function computeCalculateArea(pieceIndex, rotationIndex, xPlayArea, yPlayArea) {

        var numberOfRows = calculationArea.length;
        var numberOfColumns = calculationArea[0].length;
        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                calculationArea[j][i] = 0;
            }
        }

        var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
        // console.l og("numberOfRows: " + numberOfRows);
        var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
        // console.log("numberOfColumns: " + numberOfColumns);

        for (i = 0; i < pieceMapNumberOfRows; i++) {
            for (j = 0; j < pieceMapNumberOfColumns; j++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + j;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + i;
                    calculationArea[yOnCalculationArea][xOnCalculationArea] = pieceIndex+1;
                } 
            }
        }

        if (yOnCalculationArea > (numberOfRows-3)) {
            selectANewPiece();
        }

    }

    function selectAPieceAndRotationRandomly() {
        var numberOfPieces = Object.keys(pieceMap).length;
        // console.log("numberOfPieces: " + numberOfPieces);
        var pieceIndex = Math.floor(Math.random() * numberOfPieces);
        // console.log("pieceIndex: " + pieceIndex);
    
        var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
        // console.log("numberOfRotations: " + numberOfRotations);
        var rotationIndex = Math.floor(Math.random() * numberOfRotations);
        // console.log("rotationIndex: " + rotationIndex);

        return [pieceIndex, rotationIndex];
    }

    function drawPiece(pieceIndex, rotationIndex, xPlayArea, yPlayArea) {
        var numberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
        // console.log("numberOfRows: " + numberOfRows);
        var numberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
        // console.log("numberOfColumns: " + numberOfColumns);

        var c = document.getElementById("playAreaCanvas");
        var ctx = c.getContext("2d");
        
        ctx.clearRect(0, 0, c.width, c.height);

        ctx.fillStyle = colors[pieceIndex];

        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                if (isRectangleFilled == 1) {
                    ctx.fillRect(xPlayArea + (i * pixelSize), yPlayArea + (j * pixelSize), (pixelSize - 1), (pixelSize - 1));
                } 
            }
        }
    }

    function gameLoop() {

        computeCalculateArea(window.pieceIndex, window.rotationIndex, xPlayArea, yPlayArea);
        drawCalculationArea();

        drawPiece(window.pieceIndex, window.rotationIndex, xPlayArea, yPlayArea);
        yPlayArea = yPlayArea + fallingSpeed;

        requestAnimationFrame(gameLoop);
    }

    document.onkeydown = checkKeyboardInput;

    selectANewPiece();

    requestAnimationFrame(gameLoop);

console.log("end");
