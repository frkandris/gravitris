console.log("start");

var pixelSize = 20;
var playAreaWidth = 16 * pixelSize;
var playAreaHeight = 20 * pixelSize;
var fallingSpeed = 1;
var selectANewPieceNextFrame = true;
var moveCanBeDone = true;

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
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
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

var currentCalculationArea = [
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

var tempCalculationArea = [
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

var nextPieces = [];

var colors = [
    'red', 'green', 'blue', 'cyan', 'purple', 'brown', 'grey'
]

    function checkKeyboardInput(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            // console.log('up');
            movePieceInCalculationArea("rotateRight");
            event.preventDefault();
        }
        else if (e.keyCode == '40') {
            // console.log('down');
            movePieceInCalculationArea("rotateLeft");
            event.preventDefault();
        }
        else if (e.keyCode == '37') {
            // console.log('left');
            movePieceInCalculationArea("left");
            event.preventDefault();
        }
        else if (e.keyCode == '39') {
            // console.log('right');
            movePieceInCalculationArea("right");
            event.preventDefault();
        }
        else if (e.keyCode == '32 ') {
            // console.log('space');

            // instant drop
            while (moveCanBeDone == true) {
                yPlayArea = yPlayArea + pixelSize;
                movePieceInCalculationArea("down");
            }
            event.preventDefault();
        }
    }

    function selectANewPiece(){

        // get a random new piece
        var newPiece = selectAPieceRandomly();

        // add new item to the beginning of the array
        nextPieces.unshift(newPiece); 

        currentPiece = nextPieces.slice(-1).pop(); // get the last item
        nextPieces.splice(-1,1); // remove the last item

        // set the current piece
        window.pieceIndex = currentPiece;
        window.rotationIndex = 0;
        xPlayArea = (playAreaWidth / 2) - (2 * pixelSize);
        yPlayArea = 0 * pixelSize;
    }


    function movePieceInCalculationArea(direction){

        var xCalculationAreaModifier = 0;
        var yCalculationAreaModifier = 0;
        var rotationModifier = 0;

        if (direction == "down") {
            // calculationArea modifications
            yCalculationAreaModifier = -1;
        }
        if (direction == "left") {
            // calculationArea modifications
            xCalculationAreaModifier = 1;
            // playArea modifications
            xPlayArea = xPlayArea - pixelSize;
        }
        if (direction == "right") {
            // calculationArea modifications
            xCalculationAreaModifier = -1;
            // playArea modifications
            xPlayArea = xPlayArea + pixelSize;
        }
        if (direction == "rotateLeft") {
            // calculationArea modifications
            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            window.rotationIndex++;
            if (window.rotationIndex == numberOfRotations) {
                window.rotationIndex = 0;
            };
            rotationModifier = -1;
        }
        if (direction == "rotateRight") {
            // calculationArea modifications
            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            window.rotationIndex--;
            if (window.rotationIndex < 0) {
                window.rotationIndex = numberOfRotations - 1;
            };
            rotationModifier = 1;
        }
        if (direction == "") {
            // do nothing
        }

        // test if we can make the move

        moveCanBeDone = true;

        // 1.0. copy currentCalculationArea to tempCalculationArea

        var numberOfRows = currentCalculationArea.length;
        var numberOfColumns = currentCalculationArea[0].length;
        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                tempCalculationArea[i][j] = currentCalculationArea[i][j];
            }
        }

        // 1.1. remove pieceMap from tempCalculationArea

        var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
        window.rotationIndex += rotationModifier;
        if (window.rotationIndex < 0) {
            window.rotationIndex = numberOfRotations - 1;
        };
        if (window.rotationIndex == numberOfRotations) {
            window.rotationIndex = 0;
        };

        var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
        var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
        for (i = 0; i < pieceMapNumberOfRows; i++) {
            for (j = 0; j < pieceMapNumberOfColumns; j++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + j + yCalculationAreaModifier;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + i + xCalculationAreaModifier;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                } 
            }
        }

        // 1.2. test if we could add the piece to tempCalculationArea without overlap or any other problems

        var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
        window.rotationIndex -= rotationModifier;
        if (window.rotationIndex < 0) {
            window.rotationIndex = numberOfRotations - 1;
        };
        if (window.rotationIndex == numberOfRotations) {
            window.rotationIndex = 0;
        };
        var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
        var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;

        for (i = 0; i < pieceMapNumberOfRows; i++) {
            for (j = 0; j < pieceMapNumberOfColumns; j++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + j;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + i;
                    if (yOnCalculationArea > (numberOfRows - 2)) {
                        // piece reached the bottom
                        selectANewPieceNextFrame = true;
                        moveCanBeDone = false;
                    }
                    if (tempCalculationArea[yOnCalculationArea][xOnCalculationArea] != 0) {
                        // move can not be done, as the piece in the new position would overlap with something
                        moveCanBeDone = false;
                    };
                } 
            }
        }

        if (moveCanBeDone == true) {

            // 1.3. move can be done - remove pieceMap from currentCalculationArea

            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            window.rotationIndex += rotationModifier;
            if (window.rotationIndex < 0) {
                window.rotationIndex = numberOfRotations - 1;
            };
            if (window.rotationIndex == numberOfRotations) {
                window.rotationIndex = 0;
            };
            var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
            var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;

            for (i = 0; i < pieceMapNumberOfRows; i++) {
                for (j = 0; j < pieceMapNumberOfColumns; j++) {
                    isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                    if (isRectangleFilled == 1) {
                        var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + j + yCalculationAreaModifier;
                        var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + i + xCalculationAreaModifier;
                        currentCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                    } 
                }
            }

            // 1.4. add pieceMap to currentCalculationArea

            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            window.rotationIndex -= rotationModifier;
            if (window.rotationIndex < 0) {
                window.rotationIndex = numberOfRotations - 1;
            };
            if (window.rotationIndex == numberOfRotations) {
                window.rotationIndex = 0;
            };
            var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
            var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
            for (i = 0; i < pieceMapNumberOfRows; i++) {
                for (j = 0; j < pieceMapNumberOfColumns; j++) {
                    isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                    if (isRectangleFilled == 1) {
                        var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + j;
                        var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + i;
                        currentCalculationArea[yOnCalculationArea][xOnCalculationArea] = pieceIndex+1;
                    } 
                }
            }
        } // if (moveCanBeDone == true)

        else {
            // move can not be done
            
            // console.log("move can not be done");

            if (direction == "down") {
                selectANewPieceNextFrame = true;
            }
            if (direction == "left") {
                xPlayArea = xPlayArea + pixelSize;
            }
            if (direction == "right") {
                xPlayArea = xPlayArea - pixelSize;
            }
            if (direction == "rotateLeft") {
                var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
                window.rotationIndex--;
                if (window.rotationIndex < 0) {
                    window.rotationIndex = numberOfRotations - 1;
                };
            }
            if (direction == "rotateRight") {
                var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
                window.rotationIndex++;
                if (window.rotationIndex == numberOfRotations) {
                    window.rotationIndex = 0;
                };
            }            
        }
    }

    function drawCurrentCalculationArea(){

        var numberOfRows = currentCalculationArea.length;
        var numberOfColumns = currentCalculationArea[0].length;
        // console.log("numberOfRows: " + numberOfRows);
        // console.log("numberOfColumns: " + numberOfColumns);

        var c = document.getElementById("currentCalculationAreaCanvas");
        var ctx = c.getContext("2d");
        
        ctx.clearRect(0, 0, c.width, c.height);

        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                isRectangleFilled = currentCalculationArea[i][j];
                if (isRectangleFilled > 0) {
                    ctx.fillStyle = getPieceColor(isRectangleFilled - 1);
                    ctx.fillRect(j * pixelSize, (i + 1) * pixelSize, (pixelSize - 1), (pixelSize - 1));
                } 
            }
        }
    }


    // this function returns the color of a piece from the colors[] array

    function getPieceColor(colorIndex) {
        var colorCalculated = colorIndex % colors.length;
        return colors[colorCalculated];
    }


    function selectAPieceRandomly() {

        var numberOfPieces = Object.keys(pieceMap).length;
        var pieceIndex = Math.floor(Math.random() * numberOfPieces);
    
        return pieceIndex;
    }

    function drawPlayArea(pieceIndex, rotationIndex, xPlayArea, yPlayArea) {

        var c = document.getElementById("playAreaCanvas");
        var ctx = c.getContext("2d");
        
        ctx.clearRect(0, 0, c.width, c.height);

        // copy currentCalculationArea to tempCalculationArea

        var numberOfRows = currentCalculationArea.length;
        var numberOfColumns = currentCalculationArea[0].length;
        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                tempCalculationArea[j][i] = currentCalculationArea[j][i];
            }
        }

        // remove current falling piece from tempCalculationArea

        var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
        var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
        for (i = 0; i < pieceMapNumberOfRows; i++) {
            for (j = 0; j < pieceMapNumberOfColumns; j++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + j;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + i;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                }  
            }
        }

        // draw tempCalculationArea

        var numberOfRows = currentCalculationArea.length;
        var numberOfColumns = currentCalculationArea[0].length;
        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                isRectangleFilled = tempCalculationArea[i][j];
                if (isRectangleFilled > 0) {
                    ctx.fillStyle = getPieceColor(isRectangleFilled - 1);
                    ctx.fillRect(j * pixelSize, (i+1) * pixelSize, (pixelSize - 1), (pixelSize - 1));
                } 
            }
        }

        // draw pixelperfect moving part

        var numberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
        var numberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
        ctx.fillStyle = getPieceColor(pieceIndex);
        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                if (isRectangleFilled == 1) {
                    ctx.fillRect(xPlayArea + (i * pixelSize), (yPlayArea) + (j * pixelSize), (pixelSize - 1), (pixelSize - 1));
                } 
            }
        }
    }


    // this function checks if we have full lines in the calculationArea and removes them
    function checkFullLineInCurrentCalculationArea(){

        do {
            var fullLineFound = false;

            var numberOfRows = currentCalculationArea.length;
            var numberOfColumns = currentCalculationArea[0].length;

            // let's check for full lines
            for (i = 0; i < numberOfRows; i++) {
                numberOfEmptyRectanglesInRow = 0;
                for (j = 0; j < numberOfColumns; j++) {
                    isRectangleFilled = currentCalculationArea[i][j];
                    if (isRectangleFilled > 0) {
                        numberOfEmptyRectanglesInRow++;
                    } 
                }
                if (numberOfEmptyRectanglesInRow == numberOfColumns) {
                    // we've found a full line in row i
                    fullLineFound = true;
                    
                    // remove it
                    for (l = 0; l < numberOfColumns; l++) {
                        currentCalculationArea[i][l] = 0;
                        currentCalculationArea[0][l] = 0;
                    }
                    for (k = i; k > 0; k--) {
                        for (l = 0; l < numberOfColumns; l++) {
                            currentCalculationArea[k][l] = currentCalculationArea[k-1][l];
                        }
                    }
                    selectANewPieceNextFrame = true;          
                }
            }

            // if (fullLineFound == true) {

                // // do {

                //     var fallingRectangleFound = false;

                //     // copy currentCalculationArea to tempCalculationArea

                //     var numberOfRows = currentCalculationArea.length;
                //     var numberOfColumns = currentCalculationArea[0].length;
                //     for (i = 0; i < numberOfRows; i++) {
                //         for (j = 0; j < numberOfColumns; j++) {
                //             tempCalculationArea[i][j] = currentCalculationArea[i][j];
                //         }
                //     }

                //     // let's check for orphan rectangles that can fall down
                //     for (i = 0; i < (numberOfRows-1); i++) {
                //         for (j = 0; j < (numberOfColumns-1); j++) {
                //             isRectangleFilled = tempCalculationArea[i][j];
                //             isRectangleRightNeighbourFilled = tempCalculationArea[i][j+1];
                //             isRectangleBottomNeighbourFilled = tempCalculationArea[i+1][j];
                //             if (
                //                 (isRectangleFilled > 0) && 
                //                 (isRectangleFilled != isRectangleRightNeighbourFilled) &&
                //                 (isRectangleBottomNeighbourFilled == 0)
                //             ) {
                //                 fallingRectangleFound = true;
                //                 console.log("falling piece found");
                //                 // currentCalculationArea[i+1][j] = currentCalculationArea[i][j];
                //                 currentCalculationArea[i][j] = 1;
                //                 drawCurrentCalculationArea();
                //             }
                //         }
                //     }
                // } while (fallingRectangleFound == true)
            // }

        } while (fullLineFound == true);
    }

    // this function draws a shadow of the piece

    function drawShadow() {

        var numberOfRows = currentCalculationArea.length;

        // let's try to move the piece downwards and look for overlap
        var yModifier = 0;
        do {
            var shadowCanBeMoved = true;
            var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
            var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
            for (i = 0; i < pieceMapNumberOfRows; i++) {
                for (j = 0; j < pieceMapNumberOfColumns; j++) {
                    isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                    if (isRectangleFilled == 1) {
                        var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + j + yModifier;
                        var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + i;
                        if (yOnCalculationArea > (numberOfRows - 2)) {
                            shadowCanBeMoved = false;
                        }
                        if (tempCalculationArea[yOnCalculationArea][xOnCalculationArea] != 0) {
                            shadowCanBeMoved = false;
                        };
                    } 
                }
            }
            yModifier++;
        }
        while (shadowCanBeMoved == true);

        // let's draw the piece
        var c = document.getElementById("playAreaCanvas");
        var ctx = c.getContext("2d");

        for (i = 0; i < pieceMapNumberOfRows; i++) {
            for (j = 0; j < pieceMapNumberOfColumns; j++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + j + yModifier - 1;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + i;
                    ctx.fillStyle = "white";
                    ctx.fillRect(xOnCalculationArea * pixelSize, yOnCalculationArea * pixelSize, (pixelSize - 1), (pixelSize - 1));
                }  
            }
        }

    }

    function drawPiece(ctx, pieceToDrawIndex, xModifier, yModifier) {
        var localRotationIndex = 0;
        var pieceMapNumberOfRows = Object.keys(pieceMap[pieceToDrawIndex][localRotationIndex][localRotationIndex]).length;
        var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceToDrawIndex][localRotationIndex][localRotationIndex][0]).length;
        for (var i = 0; i < pieceMapNumberOfRows; i++) {
            for (var j = 0; j < pieceMapNumberOfColumns; j++) {
                isRectangleFilled = pieceMap[pieceToDrawIndex][localRotationIndex][localRotationIndex][i][j];
                if (isRectangleFilled == 1) {
                    var xOnCalculationArea = j + xModifier;
                    var yOnCalculationArea = i + yModifier;
                    ctx.fillStyle = getPieceColor(pieceToDrawIndex);
                    ctx.fillRect(xOnCalculationArea * pixelSize, yOnCalculationArea * pixelSize, (pixelSize - 1), (pixelSize - 1));
                }  
            }
        }
    }

    // this function draws the next pieces to the nextPiecesAreaCanvas
    function drawNextPiecesArea() {

        // let's draw the piece
        var c = document.getElementById("nextPiecesAreaCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);

        for (var i = 0; i < nextPieces.length; i++) {
            pieceToDrawIndex = nextPieces[i];
            drawPiece(ctx, pieceToDrawIndex, i * 4 + 2,  2);
        }
        
    }

    // this is the game loop, it runs every frame

    function gameLoop() {

        // check if we have full lines, if we have them, remove them
        checkFullLineInCurrentCalculationArea();

        // if we need to set a new piece, set one
        if (selectANewPieceNextFrame == true) {
            selectANewPiece();
            selectANewPieceNextFrame = false;
        }
        
        // let's move the current piece down

        // y previously in the calculationArea
        previousYCalculationArea = Math.floor(yPlayArea / pixelSize);
        // y in the playArea
        yPlayArea = yPlayArea + fallingSpeed;
        // y now in the calculationArea
        currentYCalculationArea = Math.floor(yPlayArea / pixelSize);
        // do we need to move down the piece in the calculationArea
        if (previousYCalculationArea != currentYCalculationArea) {
            // yes, try to do the move in calculationArea
            movePieceInCalculationArea("down");
        } else {
            // no, just recalculate calculationArea
            movePieceInCalculationArea("");
        }

        // draw the pixel perfect playArea
        drawPlayArea(window.pieceIndex, window.rotationIndex, xPlayArea, yPlayArea);

        // draw the calculationArea
        drawCurrentCalculationArea();

        // draw a the shadow of the piece
        drawShadow();

        // draw next pieces
        drawNextPiecesArea();
    
        // let's restart the game loop in the next frame
        requestAnimationFrame(gameLoop);
    }


    // we start everything here

    // the checkKeyboardInput() function will take care of the keyboard interactions
    document.onkeydown = checkKeyboardInput;

    // let's generate the first 3 pieces
    window.pieceIndex = selectAPieceRandomly();
    nextPieces.unshift(window.pieceIndex);
    window.pieceIndex = selectAPieceRandomly();
    nextPieces.unshift(window.pieceIndex);
    window.pieceIndex = selectAPieceRandomly();
    nextPieces.unshift(window.pieceIndex);

    // start the gameloop
    requestAnimationFrame(gameLoop);

console.log("end");
