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

var colors = [
    'red', 'green', 'blue', 'cyan', 'purple', 'brown', 'grey'
]

    function checkKeyboardInput(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            // console.log('up');
            movePieceInCalculationArea("rotateRight");
        }
        else if (e.keyCode == '40') {
            // console.log('down');
            movePieceInCalculationArea("rotateLeft");
        }
        else if (e.keyCode == '37') {
            // console.log('left');
            movePieceInCalculationArea("left");
        }
        else if (e.keyCode == '39') {
            // console.log('right');
            movePieceInCalculationArea("right");
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


    function movePieceInCalculationArea(direction){

        var xModifier = 0;
        var yModifier = 0;
        var rotationModifier = 0;

        if (direction == "down") {
            yModifier = -1;
        }
        if (direction == "left") {
            xPlayArea = xPlayArea - pixelSize;
            xModifier = 1;
        }
        if (direction == "right") {
            xPlayArea = xPlayArea + pixelSize;
            xModifier = -1;
        }
        if (direction == "rotateLeft") {
            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            window.rotationIndex++;
            if (window.rotationIndex == numberOfRotations) {
                window.rotationIndex = 0;
            };
            rotationModifier = -1;
        }
        if (direction == "rotateRight") {
            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            window.rotationIndex--;
            if (window.rotationIndex < 0) {
                window.rotationIndex = numberOfRotations - 1;
            };
            rotationModifier = 1;
        }
        if (direction == "") {
            // 
        }

        // test if we can make the move

        var moveCanBeDone = true;

        // 1.0. copy currentCalculationArea to tempCalculationArea

        var numberOfRows = currentCalculationArea.length;
        var numberOfColumns = currentCalculationArea[0].length;
        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                tempCalculationArea[j][i] = currentCalculationArea[j][i];
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
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + j + yModifier;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + i + xModifier;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                } 
            }
        }

        // 1.2. test if we could add the piece to tempCalculationArea without overlap

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
                    if (yOnCalculationArea > (numberOfRows-1)) {
                        // piece reached the bottom
                        moveCanBeDone = false;
                        console.log("reached bottom");
                    } else if (tempCalculationArea[yOnCalculationArea][xOnCalculationArea] != 0) {
                        // move can not be done
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
                        var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + j + yModifier;
                        var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + i + xModifier;
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
            
            console.log("move can not be done");

            if (direction == "down") {
                selectANewPiece();
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
                    ctx.fillStyle = colors[isRectangleFilled - 1];
                    ctx.fillRect(j * pixelSize, i * pixelSize, (pixelSize - 1), (pixelSize - 1));
                } 
            }
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
                    ctx.fillStyle = colors[isRectangleFilled - 1];
                    ctx.fillRect(j * pixelSize, (i+1) * pixelSize, (pixelSize - 1), (pixelSize - 1));
                } 
            }
        }

        // draw pixelperfect moving part

        var numberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
        var numberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
        ctx.fillStyle = colors[pieceIndex];
        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][i][j];
                if (isRectangleFilled == 1) {
                    ctx.fillRect(xPlayArea + (i * pixelSize), (yPlayArea) + (j * pixelSize), (pixelSize - 1), (pixelSize - 1));
                } 
            }
        }
    }

    // this is the game loop, it runs every frame

    function gameLoop() {

        previousYCalculationArea = Math.floor(yPlayArea / pixelSize);
        yPlayArea = yPlayArea + fallingSpeed;
        currentYCalculationArea = Math.floor(yPlayArea / pixelSize);
        if (previousYCalculationArea != currentYCalculationArea) {
            movePieceInCalculationArea("down");
        } else {
            movePieceInCalculationArea("");
            // computeCalculateArea(window.pieceIndex, window.rotationIndex, xPlayArea, yPlayArea);
        }

        drawPlayArea(window.pieceIndex, window.rotationIndex, xPlayArea, yPlayArea);
        drawCurrentCalculationArea();

        // let's restart the game loop in the next frame
        requestAnimationFrame(gameLoop);
    }

    // we start everything here

    // the checkKeyboardInput() function will take care of the keyboard interactions
    document.onkeydown = checkKeyboardInput;

    // let's decide the first piece
    selectANewPiece();

    // start the gameloop
    requestAnimationFrame(gameLoop);

console.log("end");
