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

var pieceConnectionsMap = {
    0 : [
        { 
            0 : [
                [0, 0b0010, 0, 0],
                [0, 0b1010, 0, 0],
                [0, 0b1100, 0b0001, 0]
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
                [0, 0, 0b0010, 0],
                [0, 0, 0b1010, 0],
                [0, 0, 0b1010, 0],
                [0, 0, 0b1000, 0]
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
                [0, 0b0110, 0b0011, 0],
                [0, 0b1100, 0b1001, 0]
            ]
        }
    ],
    3 : [
        { 
            0 : [
                [0, 0, 0b0010, 0],
                [0, 0, 0b1010, 0],
                [0, 0b0100, 0b1001, 0]
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
                [0, 0b0010, 0, 0],
                [0b0100, 0b1101, 0b0001, 0],
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
                [0, 0b0010, 0, 0],
                [0, 0b1100, 0b0011, 0],
                [0, 0, 0b1000, 0]
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
                [0, 0, 0b0010, 0],
                [0, 0b0110, 0b1001, 0],
                [0, 0b1000, 0, 0]
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


    // this function handles the keyboard events

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


    // this function sets the next new piece 
    // (gets the new one from the nextPieces, adds a new random piece to nextPieces, sets coordinates of the new piece)

    function selectANewPiece(){

        // get a random new piece
        var newPiece = selectAPieceRandomly();

        // add new item to the beginning of the array
        nextPieces.unshift(newPiece); 

        currentPiece = nextPieces.slice(-1).pop(); // get the last item
        nextPieces.splice(-1,1); // remove the last item

        // set the current piece
        pieceIndex = currentPiece;
        rotationIndex = 0;
        xPlayArea = (playAreaWidth / 2) - (2 * pixelSize);
        yPlayArea = 0 * pixelSize;
    }


    // this function calculates what happens, when the piece moves & rotates in currentCalculationArea

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
            rotationIndex++;
            if (rotationIndex == numberOfRotations) {
                rotationIndex = 0;
            };
            rotationModifier = -1;
        }
        if (direction == "rotateRight") {
            // calculationArea modifications
            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            rotationIndex--;
            if (rotationIndex < 0) {
                rotationIndex = numberOfRotations - 1;
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
        for (var y = 0; y < numberOfRows; y++) {
            for (var x = 0; x < numberOfColumns; x++) {
                tempCalculationArea[y][x] = currentCalculationArea[y][x];
            }
        }

        // 1.1. remove pieceMap from tempCalculationArea

        var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
        rotationIndex += rotationModifier;
        if (rotationIndex < 0) {
            rotationIndex = numberOfRotations - 1;
        };
        if (rotationIndex == numberOfRotations) {
            rotationIndex = 0;
        };

        var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
        var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
        for (var y = 0; y < pieceMapNumberOfRows; y++) {
            for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y + yCalculationAreaModifier;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x + xCalculationAreaModifier;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                } 
            }
        }

        // 1.2. test if we could add the piece to tempCalculationArea without overlap or any other problems

        var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
        rotationIndex -= rotationModifier;
        if (rotationIndex < 0) {
            rotationIndex = numberOfRotations - 1;
        };
        if (rotationIndex == numberOfRotations) {
            rotationIndex = 0;
        };
        var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
        var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;

        for (var y = 0; y < pieceMapNumberOfRows; y++) {
            for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x;
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
            rotationIndex += rotationModifier;
            if (rotationIndex < 0) {
                rotationIndex = numberOfRotations - 1;
            };
            if (rotationIndex == numberOfRotations) {
                rotationIndex = 0;
            };
            var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
            var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;

            for (var y = 0; y < pieceMapNumberOfRows; y++) {
                for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                    isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][y][x];
                    if (isRectangleFilled == 1) {
                        var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y + yCalculationAreaModifier;
                        var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x + xCalculationAreaModifier;
                        currentCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                    } 
                }
            }

            // 1.4. add pieceMap to currentCalculationArea

            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            rotationIndex -= rotationModifier;
            if (rotationIndex < 0) {
                rotationIndex = numberOfRotations - 1;
            };
            if (rotationIndex == numberOfRotations) {
                rotationIndex = 0;
            };
            var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
            var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
            for (var y = 0; y < pieceMapNumberOfRows; y++) {
                for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                    isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][y][x];
                    if (isRectangleFilled == 1) {
                        var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y;
                        var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x;
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
                rotationIndex--;
                if (rotationIndex < 0) {
                    rotationIndex = numberOfRotations - 1;
                };
            }
            if (direction == "rotateRight") {
                var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
                rotationIndex++;
                if (rotationIndex == numberOfRotations) {
                    rotationIndex = 0;
                };
            }            
        }
    }


    // this function draws the currenCalculationArea to the currentCalculationAreaCanvas

    function drawCurrentCalculationArea(){

        var numberOfRows = currentCalculationArea.length;
        var numberOfColumns = currentCalculationArea[0].length;
        // console.log("numberOfRows: " + numberOfRows);
        // console.log("numberOfColumns: " + numberOfColumns);

        var c = document.getElementById("currentCalculationAreaCanvas");
        var ctx = c.getContext("2d");
        
        ctx.clearRect(0, 0, c.width, c.height);

        for (var y = 0; y < numberOfRows; y++) {
            for (var x = 0; x < numberOfColumns; x++) {
                isRectangleFilled = currentCalculationArea[y][x];
                if (isRectangleFilled > 0) {
                    ctx.fillStyle = getPieceColor(isRectangleFilled - 1);
                    ctx.fillRect(x * pixelSize, (y + 1) * pixelSize, (pixelSize - 1), (pixelSize - 1));
                } 
            }
        }
    }


    // this function returns the color of a piece from the colors[] array

    function getPieceColor(colorIndex) {
        var colorCalculated = colorIndex % colors.length;
        return colors[colorCalculated];
    }


    // this function returns the index of a randomly selected piece

    function selectAPieceRandomly() {

        var numberOfPieces = Object.keys(pieceMap).length;
        var pieceIndex = Math.floor(Math.random() * numberOfPieces);
    
        return pieceIndex;
    }

    function drawPlayArea() {

        var c = document.getElementById("playAreaCanvas");
        var ctx = c.getContext("2d");
        
        ctx.clearRect(0, 0, c.width, c.height);

        // copy currentCalculationArea to tempCalculationArea

        var numberOfRows = currentCalculationArea.length;
        var numberOfColumns = currentCalculationArea[0].length;
        for (var y = 0; y < numberOfRows; y++) {
            for (var x = 0; x < numberOfColumns; x++) {
                tempCalculationArea[y][x] = currentCalculationArea[y][x];
            }
        }

        // remove current falling piece from tempCalculationArea

        var pieceMapNumberOfRows = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex]).length;
        var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceIndex][rotationIndex][rotationIndex][0]).length;
        for (var y = 0; y < pieceMapNumberOfRows; y++) {
            for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                }  
            }
        }

        // draw tempCalculationArea to the playArea

        var numberOfRows = currentCalculationArea.length;
        var numberOfColumns = currentCalculationArea[0].length;
        for (var y = 0; y < numberOfRows; y++) {
            for (var x = 0; x < numberOfColumns; x++) {
                isRectangleFilled = tempCalculationArea[y][x];
                if (isRectangleFilled > 0) {
                    ctx.fillStyle = getPieceColor(isRectangleFilled - 1);
                    ctx.fillRect(x * pixelSize, (y + 1) * pixelSize, (pixelSize - 1), (pixelSize - 1));
                } 
            }
        }

        // draw a the shadow of the moving piece

        drawShadow();

        // draw pixelperfect moving piece

        var xModifier = xPlayArea / pixelSize;
        var yModifier = yPlayArea / pixelSize;
        var pieceToDrawIndex = pieceIndex;
        var pieceToDrawRotation = rotationIndex;
        drawPiece(ctx, pieceToDrawIndex, pieceToDrawRotation, xModifier, yModifier);

    }


    // this function checks if we have full lines in the calculationArea and removes them

    function checkFullLineInCurrentCalculationArea(){

        do {
            var fullLineFound = false;

            var numberOfRows = currentCalculationArea.length;
            var numberOfColumns = currentCalculationArea[0].length;

            // let's check for full lines
            for (var i = 0; i < numberOfRows; i++) {
                numberOfEmptyRectanglesInRow = 0;
                for (var j = 0; j < numberOfColumns; j++) {
                    isRectangleFilled = currentCalculationArea[i][j];
                    if (isRectangleFilled > 0) {
                        numberOfEmptyRectanglesInRow++;
                    } 
                }
                if (numberOfEmptyRectanglesInRow == numberOfColumns) {
                    // we've found a full line in row i
                    fullLineFound = true;
                    
                    // remove it
                    for (var l = 0; l < numberOfColumns; l++) {
                        currentCalculationArea[i][l] = 0;
                        currentCalculationArea[0][l] = 0;
                    }
                    for (var k = i; k > 0; k--) {
                        for (var l = 0; l < numberOfColumns; l++) {
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
            for (var y = 0; y < pieceMapNumberOfRows; y++) {
                for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                    isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][y][x];
                    if (isRectangleFilled == 1) {
                        var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y + yModifier;
                        var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x;
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

        for (var y = 0; y < pieceMapNumberOfRows; y++) {
            for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                isRectangleFilled = pieceMap[pieceIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y + yModifier - 1;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x;
                    ctx.fillStyle = "white";
                    ctx.fillRect(xOnCalculationArea * pixelSize, yOnCalculationArea * pixelSize, (pixelSize - 1), (pixelSize - 1));
                }  
            }
        }

    }

    function drawPiece(ctx, pieceToDrawIndex, pieceToDrawRotation, xModifier, yModifier) {

        var rotationIndex = pieceToDrawRotation;

        var pieceMapNumberOfRows = Object.keys(pieceMap[pieceToDrawIndex][rotationIndex][rotationIndex]).length;
        var pieceMapNumberOfColumns = Object.keys(pieceMap[pieceToDrawIndex][rotationIndex][rotationIndex][0]).length;
        for (var i = 0; i < pieceMapNumberOfRows; i++) {
            for (var j = 0; j < pieceMapNumberOfColumns; j++) {
                isRectangleFilled = pieceMap[pieceToDrawIndex][rotationIndex][rotationIndex][i][j];
                if (isRectangleFilled == 1) {

                    ctx.fillStyle = getPieceColor(pieceToDrawIndex);

                    // draw the piece
                    var xOnCalculationArea = j + xModifier;
                    var yOnCalculationArea = i + yModifier;
                    ctx.fillRect(xOnCalculationArea * pixelSize, yOnCalculationArea * pixelSize, (pixelSize - 1), (pixelSize - 1));

                    // draw the piece connections
                    rectangleConnections = pieceConnectionsMap[pieceToDrawIndex][rotationIndex][rotationIndex][i][j];
                    if ( (rectangleConnections & 0b1000) != 0) {
                        ctx.fillRect(xOnCalculationArea * pixelSize, yOnCalculationArea * pixelSize - 1, (pixelSize - 1), 1);
                    }
                    if ( (rectangleConnections & 0b0100) != 0) {
                        ctx.fillRect(xOnCalculationArea * pixelSize + pixelSize - 1, yOnCalculationArea * pixelSize, 1, (pixelSize - 1));
                    }
                    if ( (rectangleConnections & 0b0010) != 0) {
                        ctx.fillRect(xOnCalculationArea * pixelSize, yOnCalculationArea * pixelSize + pixelSize - 1, (pixelSize - 1), 1);
                    }
                    if ( (rectangleConnections & 0b0001) != 0) {
                        ctx.fillRect(xOnCalculationArea * pixelSize - 1, yOnCalculationArea * pixelSize, 1, (pixelSize - 1));
                    }
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
            pieceToDrawRotation = 0;
            drawPiece(ctx, pieceToDrawIndex, pieceToDrawRotation, i * 4 + 2,  2);
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
        drawPlayArea();

        // draw the calculationArea
        drawCurrentCalculationArea();

        // draw next pieces
        drawNextPiecesArea();
    
        // let's restart the game loop in the next frame
        requestAnimationFrame(gameLoop);
    }


    // we start everything here

    // the checkKeyboardInput() function will take care of the keyboard interactions
    document.onkeydown = checkKeyboardInput;

    // let's generate the first 3 pieces
    pieceIndex = selectAPieceRandomly();
    nextPieces.unshift(pieceIndex);
    pieceIndex = selectAPieceRandomly();
    nextPieces.unshift(pieceIndex);
    pieceIndex = selectAPieceRandomly();
    nextPieces.unshift(pieceIndex);

    // start the gameloop
    requestAnimationFrame(gameLoop);

console.log("end");
