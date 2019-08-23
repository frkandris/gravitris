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
        var values = selectAPieceAndRotationRandomly();
        window.pieceIndex = values[0];
        window.rotationIndex = values[1];
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
                    ctx.fillRect(j * pixelSize, (i + 1) * pixelSize, (pixelSize - 1), (pixelSize - 1));
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


    // this function checks if we have full lines in the calculationArea and removes them
    function checkFullLineInCurrentCalculationArea(){

        do {
            var fullLineFound = false;
            var numberOfRows = currentCalculationArea.length;
            var numberOfColumns = currentCalculationArea[0].length;
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
        } while (fullLineFound == true);
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

        // let's restart the game loop in the next frame
        requestAnimationFrame(gameLoop);
    }

    // we start everything here

    // the checkKeyboardInput() function will take care of the keyboard interactions
    document.onkeydown = checkKeyboardInput;

    // start the gameloop
    requestAnimationFrame(gameLoop);

console.log("end");
