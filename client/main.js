console.log("start");

var pieceMap = require('./includes/pieceMap');

var colorRelated = require('./includes/colorRelated');
var shadowColor = colorRelated.shadowColor;
var hexToRGB = colorRelated.hexToRGB;
var getPieceColor = colorRelated.getPieceColor;

var pixelSize = 20;
var playAreaWidth = 16 * pixelSize;
var fallingSpeed = 1;
var selectANewPieceNextFrame = true;
var moveCanBeDone = true;
var stopTheGameLoop = false;
var pieceCounter = 0;
var frameNumber = 0;
var playAreaMode = '';
var fullLines = [];
var fullLineFadeAnimationLength = 10;
var fullLineFadeAnimationCounter = fullLineFadeAnimationLength;
var listOfPiecesThatCanBeMoved = [];
var gravityAnimationFallingSpeed = 4;
var gravityAnimationYModifier = 0;

var debugShowPieceNumbers = false; 

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

var currentGravityCalculationArea = [
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

var listOfPiecesInThePlayingArea = [];

var logOfEvents = [];


    // this function handles the keyboard events

    function checkKeyboardInput(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            // up
            logOfEvents.push({
                frameNumber: frameNumber,
                event: 'keyPressed',
                eventValue: 'rotateRight'
            });
            movePieceInCalculationArea('rotateRight');
            event.preventDefault();
        }
        else if (e.keyCode == '40') {
            // down
            logOfEvents.push({
                frameNumber: frameNumber,
                event: 'keyPressed',
                eventValue: 'rotateLeft'
            });
            movePieceInCalculationArea('rotateLeft');
            event.preventDefault();
        }
        else if (e.keyCode == '37') {
            // left
            logOfEvents.push({
                frameNumber: frameNumber,
                event: 'keyPressed',
                eventValue: 'moveLeft'
            });
            movePieceInCalculationArea('moveLeft');
            event.preventDefault();
        }
        else if (e.keyCode == '39') {
            // right
            logOfEvents.push({
                frameNumber: frameNumber,
                event: 'keyPressed',
                eventValue: 'moveRight'
            });
            movePieceInCalculationArea('moveRight');
            event.preventDefault();
        }
        else if (e.keyCode == '32 ') {
            // space
            logOfEvents.push({
                frameNumber: frameNumber,
                event: 'keyPressed',
                eventValue: 'instantDrop'
            });
            // instant drop
            while (moveCanBeDone == true) {
                yPlayArea = yPlayArea + pixelSize;
                movePieceInCalculationArea('moveDown');
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

        pieceCounter++;

        logOfEvents.push({
            frameNumber: frameNumber,
            event: 'newPiece',
            eventValue: pieceIndex
        });

    }


    // this function calculates what happens, when the piece moves & rotates in currentCalculationArea

    function movePieceInCalculationArea(direction){

        var xCalculationAreaModifier = 0;
        var yCalculationAreaModifier = 0;
        var rotationModifier = 0;

        if (direction == 'moveDown') {
            // calculationArea modifications
            yCalculationAreaModifier = -1;
        }
        if (direction == 'moveLeft') {
            // calculationArea modifications
            xCalculationAreaModifier = 1;
            // playArea modifications
            xPlayArea = xPlayArea - pixelSize;
        }
        if (direction == 'moveRight') {
            // calculationArea modifications
            xCalculationAreaModifier = -1;
            // playArea modifications
            xPlayArea = xPlayArea + pixelSize;
        }
        if (direction == 'rotateLeft') {
            // calculationArea modifications
            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            rotationIndex++;
            if (rotationIndex == numberOfRotations) {
                rotationIndex = 0;
            }
            rotationModifier = -1;
        }
        if (direction == 'rotateRight') {
            // calculationArea modifications
            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            rotationIndex--;
            if (rotationIndex < 0) {
                rotationIndex = numberOfRotations - 1;
            }
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
        }
        if (rotationIndex == numberOfRotations) {
            rotationIndex = 0;
        }

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
        }
        if (rotationIndex == numberOfRotations) {
            rotationIndex = 0;
        }
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
                    }
                } 
            }
        }

        if (moveCanBeDone == true) {

            // 1.3. move can be done - remove pieceMap from currentCalculationArea

            var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
            rotationIndex += rotationModifier;
            if (rotationIndex < 0) {
                rotationIndex = numberOfRotations - 1;
            }
            if (rotationIndex == numberOfRotations) {
                rotationIndex = 0;
            }
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
            }
            if (rotationIndex == numberOfRotations) {
                rotationIndex = 0;
            }
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
            
            if (direction == 'moveDown') {
                selectANewPieceNextFrame = true;
            }
            if (direction == 'moveLeft') {
                xPlayArea = xPlayArea + pixelSize;
            }
            if (direction == 'moveRight') {
                xPlayArea = xPlayArea - pixelSize;
            }
            if (direction == 'rotateLeft') {
                var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
                rotationIndex--;
                if (rotationIndex < 0) {
                    rotationIndex = numberOfRotations - 1;
                }
            }
            if (direction == 'rotateRight') {
                var numberOfRotations = Object.keys(pieceMap[pieceIndex]).length;
                rotationIndex++;
                if (rotationIndex == numberOfRotations) {
                    rotationIndex = 0;
                }
            }            
        }
    }


    // this function returns the index of a randomly selected piece

    function selectAPieceRandomly() {

        var numberOfPieces = Object.keys(pieceMap).length;
        var pieceIndex = Math.floor(Math.random() * numberOfPieces);
    
        return pieceIndex;
    }


    // this function draws the playArea, the shadow and the pixelperfect falling piece

    function drawPlayAreaWithFallingPiece() {

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


    // this function 
    function drawPlayArea() {

        var c = document.getElementById("playAreaCanvas");
        var ctx = c.getContext("2d");
        
        ctx.clearRect(0, 0, c.width, c.height);

        // draw currentCalculationArea to the playArea

        var numberOfRows = currentCalculationArea.length;
        var numberOfColumns = currentCalculationArea[0].length;
        for (var y = 0; y < numberOfRows; y++) {
            for (var x = 0; x < numberOfColumns; x++) {
                isRectangleFilled = currentCalculationArea[y][x];
                if (isRectangleFilled > 0) {
                    var pieceColor = getPieceColor(isRectangleFilled - 1);
                    if (fullLines.includes(y)) {
                        var opacity = fullLineFadeAnimationCounter/fullLineFadeAnimationLength;
                    } else {
                        opacity = 1;
                    }
                    var fillStyle = hexToRGB(pieceColor, opacity);
                    ctx.fillStyle = fillStyle;
                    ctx.fillRect(x * pixelSize, (y + 1) * pixelSize, (pixelSize - 1), (pixelSize - 1));
                } 
            }
        }
    }


    // this function checks if we have full lines in the calculationArea and removes them

    function checkFullLineInCurrentCalculationArea(){

        fullLines = [];
        fullLineFound = false;

        var numberOfRows = currentCalculationArea.length;
        var numberOfColumns = currentCalculationArea[0].length;

        // let's check all rows for full lines
        for (var i = 0; i < numberOfRows; i++) {
            numberOfFilledRectanglesInRow = 0;
            for (var j = 0; j < numberOfColumns; j++) {
                isRectangleFilled = currentCalculationArea[i][j];
                if (isRectangleFilled > 0) {
                    numberOfFilledRectanglesInRow++;
                } 
            }
            if (numberOfFilledRectanglesInRow == numberOfColumns) {
                // we've found a full line in row i
                fullLineFound = true;
                fullLines.push(i);                        
            }
        }
        if (fullLineFound == true) {
            playAreaMode = 'fullLineRemoveAnimation';
        }
    }


    // this function animates the full lines, until they are nonvisible

    function animateFullLines(fullLines) {

        fullLineFadeAnimationCounter--;

        if (fullLineFadeAnimationCounter == 0) {
            fullLineFadeAnimationCounter = fullLineFadeAnimationLength;
            return true;
        } else {
            return false;
        }
    }


    // this function removes the full lines

    function hideFullLines(fullLines) {

        var numberOfColumns = currentCalculationArea[0].length;

        for (p = 0; p < fullLines.length; p++) {
            
            fullLine = fullLines[p];

            // remove it
            for (var l = 0; l < numberOfColumns; l++) {
                currentCalculationArea[fullLine][l] = 0;
                currentCalculationArea[0][l] = 0;
            }
            // move everything above the line 1 row down
            for (var k = fullLine; k > 0; k--) {
                for (var l = 0; l < numberOfColumns; l++) {
                    currentCalculationArea[k][l] = currentCalculationArea[k-1][l];
                }
            }

            // modify listOfPiecesInThePlayingArea because of full line
            modifylistOfPiecesInThePlayingAreaBecauseOfFullLine(fullLine);
        }

        playAreaMode = 'gravityAnimation';

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
                        }
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
                    ctx.fillStyle = shadowColor;
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


    // this function saves the piece that has completed its journey to listOfPiecesInThePlayingArea

    function saveDonePiece() {

        var pieceAlreadyInserted = false;
        for (var i = 0; i < listOfPiecesInThePlayingArea.length; i++) {
            if (listOfPiecesInThePlayingArea[i].pieceCounter == pieceCounter) {
                pieceAlreadyInserted = true;
            }
        }

        if (pieceAlreadyInserted == false) {
            try {        
                listOfPiecesInThePlayingArea.push({ 
                    pieceMap: pieceMap[pieceIndex][rotationIndex][rotationIndex],
                    pieceIndex: pieceIndex,
                    pieceX: Math.floor(xPlayArea / pixelSize),
                    pieceY: Math.floor(yPlayArea / pixelSize) - 1,
                    pieceCounter: pieceCounter,
                    wasChecked: false
                });
            } catch(error) { 
            }
        }
    }


    // this function draws the currentGravityCalculationArea
    
    function drawCurrentGravityCalculationArea() {

        // clear currentGravityCalculationArea
        var numberOfRows = currentGravityCalculationArea.length;
        var numberOfColumns = currentGravityCalculationArea[0].length;
        for (var y = 0; y < numberOfRows; y++) {
            for (var x = 0; x < numberOfColumns; x++) {
                currentGravityCalculationArea[y][x] = 0;
            }
        }

        // clear the canvas
        var c = document.getElementById("currentGravityCalculationAreaCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        
        // go thru the pieces one by one in listOfPiecesInThePlayingArea
        for (var i = 0; i < listOfPiecesInThePlayingArea.length; i++) {
            var pieceMapNumberOfRows = Object.keys(listOfPiecesInThePlayingArea[i].pieceMap).length;
            var pieceMapNumberOfColumns = Object.keys(listOfPiecesInThePlayingArea[i].pieceMap[0]).length;
            for (var y = 0; y < pieceMapNumberOfRows; y++) {
                for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                    isRectangleFilled = listOfPiecesInThePlayingArea[i].pieceMap[y][x];
                    if (isRectangleFilled == 1) {
                        // copy the map of the piece to currentGravityCalculationArea
                        var yOnGravityCalculationArea = listOfPiecesInThePlayingArea[i].pieceY + y;
                        var xOnGravityCalculationArea = listOfPiecesInThePlayingArea[i].pieceX + x;
                        var colorOnGravityCalculationArea = listOfPiecesInThePlayingArea[i].pieceIndex + 1;
                        currentGravityCalculationArea[yOnGravityCalculationArea][xOnGravityCalculationArea] = colorOnGravityCalculationArea;

                        // add the number
                        ctx.fillStyle = getPieceColor(colorOnGravityCalculationArea - 1);
                        ctx.fillRect(xOnGravityCalculationArea * pixelSize, (yOnGravityCalculationArea + 1) * pixelSize, (pixelSize-1), (pixelSize-1));
                        if (debugShowPieceNumbers == true) {
                            ctx.fillStyle = "white";
                            ctx.font = "10px Arial";
                            ctx.fillText(i, xOnGravityCalculationArea * pixelSize + 5, (yOnGravityCalculationArea + 1) * pixelSize + 10);
                        }
                    }
                }
            }
        }
    }


    // this function modifies pieces in the listOfPiecesInThePlayingArea in case there was a full line

    function modifylistOfPiecesInThePlayingAreaBecauseOfFullLine(fullLineIndex) {

        // go thru the pieces one by one in listOfPiecesInThePlayingArea 
        // (we iterate backwards, so when we remove an item reindexing the array will not break the loop)
        for (var i = listOfPiecesInThePlayingArea.length - 1; i >= 0; i--) {
            pieceIsAffected = false;
            listOfPiecesInThePlayingArea[i].wasChecked = true;
            var pieceMapNumberOfRows = Object.keys(listOfPiecesInThePlayingArea[i].pieceMap).length;
            var pieceMapNumberOfColumns = Object.keys(listOfPiecesInThePlayingArea[i].pieceMap[0]).length;
            for (var y = 0; y < pieceMapNumberOfRows; y++) {
                for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                    isRectangleFilled = listOfPiecesInThePlayingArea[i].pieceMap[y][x];
                    if (isRectangleFilled == 1) {
                        if (fullLineIndex == (listOfPiecesInThePlayingArea[i].pieceY + y)) {
                            // the y coordinate of the pixel matches the full line row number
                            pieceIsAffected = true;
                            lineAffected = y;
                        }
                    }
                }
                if (pieceIsAffected == true) { break; }
            }
            if (pieceIsAffected == true) {
                thereWerePixelsAboveTheCut = false;
                for (var y = 0; y < lineAffected; y++) {
                    for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                        isRectangleFilled = listOfPiecesInThePlayingArea[i].pieceMap[y][x];
                        if (isRectangleFilled == 1) {
                            thereWerePixelsAboveTheCut = true;
                        }
                    }
                }
                if (thereWerePixelsAboveTheCut == true) {
                    var newPieceMap = [];
                    for (var y = 0; y < lineAffected; y++) {
                        newPieceMap[y] = [];
                        for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                            newPieceMap[y][x] = 0;
                        }
                    }
                    listOfPiecesInThePlayingArea.push({ 
                        pieceMap: newPieceMap,
                        pieceIndex: listOfPiecesInThePlayingArea[i].pieceIndex,
                        pieceX: listOfPiecesInThePlayingArea[i].pieceX,
                        pieceY: listOfPiecesInThePlayingArea[i].pieceY,
                        pieceCounter: listOfPiecesInThePlayingArea[i].pieceCounter
                    });
                    for (var y = 0; y < lineAffected; y++) {
                        for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                            listOfPiecesInThePlayingArea[listOfPiecesInThePlayingArea.length-1].pieceMap[y][x] = listOfPiecesInThePlayingArea[i].pieceMap[y][x];
                        }
                    }    
                }
                thereWerePixelsUnderTheCut = false;
                for (var y = lineAffected + 1; y < pieceMapNumberOfRows; y++) {
                    for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                        isRectangleFilled = listOfPiecesInThePlayingArea[i].pieceMap[y][x];
                        if (isRectangleFilled == 1) {
                            thereWerePixelsUnderTheCut = true;
                        }
                    }
                }
                if (thereWerePixelsUnderTheCut == true) {
                    var newPieceMap = [];
                    for (var y = lineAffected + 1; y < pieceMapNumberOfRows; y++) {
                        newPieceMap[y - (lineAffected + 1)] = [];
                        for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                            newPieceMap[y - (lineAffected + 1)][x] = 0;
                        }
                    }
                    listOfPiecesInThePlayingArea.push({ 
                        pieceMap: newPieceMap,
                        pieceIndex: listOfPiecesInThePlayingArea[i].pieceIndex,
                        pieceX: listOfPiecesInThePlayingArea[i].pieceX,
                        pieceY: listOfPiecesInThePlayingArea[i].pieceY + lineAffected + 1,
                        pieceCounter: listOfPiecesInThePlayingArea[i].pieceCounter
                    });
                    for (var y = lineAffected + 1; y < pieceMapNumberOfRows; y++) {
                        for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                            listOfPiecesInThePlayingArea[listOfPiecesInThePlayingArea.length-1].pieceMap[y - (lineAffected + 1)][x] = listOfPiecesInThePlayingArea[i].pieceMap[y][x];
                        }
                    }    
                }
                // remove the old item from the list
                listOfPiecesInThePlayingArea.splice(i, 1);
            }
        }

    }


    // this function checks if any of the pieces can fall down

    function checkIfAnyPieceCanFallDown() {
        
        thereWasMovementInThisRound = false;
        listOfPiecesThatCanBeMoved = [];

        // let's iterate thru all the pieces we have in listOfPiecesInThePlayingArea
        for (var i = 0; i < listOfPiecesInThePlayingArea.length; i++) {

            // clear currentGravityCalculationArea
            var numberOfRows = currentGravityCalculationArea.length;
            var numberOfColumns = currentGravityCalculationArea[0].length;
            for (var y = 0; y < numberOfRows; y++) {
                for (var x = 0; x < numberOfColumns; x++) {
                    currentGravityCalculationArea[y][x] = 0;
                }
            }

            // calculate currentGravityCalculationArea, without the current piece
            
            // go thru the pieces one by one in listOfPiecesInThePlayingArea
            // draw every piece except the one we calculate now
            for (var k = 0; k < listOfPiecesInThePlayingArea.length; k++) {
                if (k != i) {
                    var pieceMapNumberOfRows = Object.keys(listOfPiecesInThePlayingArea[k].pieceMap).length;
                    var pieceMapNumberOfColumns = Object.keys(listOfPiecesInThePlayingArea[k].pieceMap[0]).length;
                    for (var y = 0; y < pieceMapNumberOfRows; y++) {
                        for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                            isRectangleFilled = listOfPiecesInThePlayingArea[k].pieceMap[y][x];
                            if (isRectangleFilled == 1) {
                                // copy the map of the piece to currentGravityCalculationArea
                                var yOnGravityCalculationArea = listOfPiecesInThePlayingArea[k].pieceY + y;
                                var xOnGravityCalculationArea = listOfPiecesInThePlayingArea[k].pieceX + x;
                                var colorOnGravityCalculationArea = listOfPiecesInThePlayingArea[k].pieceIndex + 1;
                                currentGravityCalculationArea[yOnGravityCalculationArea][xOnGravityCalculationArea] = colorOnGravityCalculationArea;
                            }
                        }
                    }
                }
            }

            // let's try to move the piece downwards and look for overlap
            
            var numberOfRows = currentGravityCalculationArea.length;
            var numberOfColumns = currentGravityCalculationArea[0].length;
            for (var y = 0; y < numberOfRows; y++) {
                var line = '';
                for (var x = 0; x < numberOfColumns; x++) {
                    line = line + currentGravityCalculationArea[y][x];
                }
            }

            var pieceCanBeMoved = true;
            var yModifier = 0;
            var numberOfRows = currentGravityCalculationArea.length;
            var pieceMapNumberOfRows = Object.keys(listOfPiecesInThePlayingArea[i].pieceMap).length;
            var pieceMapNumberOfColumns = Object.keys(listOfPiecesInThePlayingArea[i].pieceMap[0]).length;

            for (var y = 0; y < pieceMapNumberOfRows; y++) {
                for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                    isRectangleFilled = listOfPiecesInThePlayingArea[i].pieceMap[y][x];
                    if (isRectangleFilled == 1) {
                        var yOnCalculationArea = listOfPiecesInThePlayingArea[i].pieceY + y + yModifier + 1;
                        var xOnCalculationArea = listOfPiecesInThePlayingArea[i].pieceX + x;
                        if (yOnCalculationArea > (numberOfRows - 2)) {
                            // piece reached the bottom
                            pieceCanBeMoved = false;
                            break;
                        }
                        if (currentGravityCalculationArea[yOnCalculationArea][xOnCalculationArea] != 0) {
                            // piece collided with another piece
                            pieceCanBeMoved = false;
                        }
                        if (pieceCanBeMoved == true) {
                            // no problem
                        }
                    } 
                }
            }
            if (pieceCanBeMoved == true) {
                listOfPiecesThatCanBeMoved.push(i);
                // yModifier++;
                // listOfPiecesInThePlayingArea[i].pieceY++;
                thereWasMovementInThisRound = true;
            } else {
                // piece could not be moved
            }
        }

        drawCurrentGravityCalculationArea();

        return thereWasMovementInThisRound;
    }

    function copyCurrentGravityCalculationAreaToCurrentCalculationArea() {
        var numberOfRows = currentGravityCalculationArea.length;
        var numberOfColumns = currentGravityCalculationArea[0].length;
        for (var y = 0; y < numberOfRows; y++) {
            for (var x = 0; x < numberOfColumns; x++) {
                currentCalculationArea[y][x] = currentGravityCalculationArea[y][x];
            }
        }
    }


    // this function draws the currentGravityCalculationField with falling pieces

    function drawPlayAreaWithFallingPieces() {

        // clear currentGravityCalculationArea
        var numberOfRows = currentGravityCalculationArea.length;
        var numberOfColumns = currentGravityCalculationArea[0].length;
        for (var y = 0; y < numberOfRows; y++) {
            for (var x = 0; x < numberOfColumns; x++) {
                currentGravityCalculationArea[y][x] = 0;
            }
        }

        // clear the canvas
        var c = document.getElementById("playAreaCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        
        // go thru the pieces one by one in listOfPiecesInThePlayingArea
        for (var i = 0; i < listOfPiecesInThePlayingArea.length; i++) {
            var pieceMapNumberOfRows = Object.keys(listOfPiecesInThePlayingArea[i].pieceMap).length;
            var pieceMapNumberOfColumns = Object.keys(listOfPiecesInThePlayingArea[i].pieceMap[0]).length;
            for (var y = 0; y < pieceMapNumberOfRows; y++) {
                for (var x = 0; x < pieceMapNumberOfColumns; x++) {
                    isRectangleFilled = listOfPiecesInThePlayingArea[i].pieceMap[y][x];
                    if (isRectangleFilled == 1) {
                        // copy the map of the piece to currentGravityCalculationArea
                        var yOnGravityCalculationArea = listOfPiecesInThePlayingArea[i].pieceY + y;
                        var xOnGravityCalculationArea = listOfPiecesInThePlayingArea[i].pieceX + x;
                        var colorOnGravityCalculationArea = listOfPiecesInThePlayingArea[i].pieceIndex + 1;
                        currentGravityCalculationArea[yOnGravityCalculationArea][xOnGravityCalculationArea] = colorOnGravityCalculationArea;

                        // add the number

                        if (listOfPiecesThatCanBeMoved.includes(i)) {
                            yModifierInPixels = gravityAnimationYModifier;
                        } else {
                            yModifierInPixels = 0;
                        }
                        ctx.fillStyle = getPieceColor(colorOnGravityCalculationArea - 1);
                        ctx.fillRect(xOnGravityCalculationArea * pixelSize, (yOnGravityCalculationArea + 1) * pixelSize + yModifierInPixels, (pixelSize-1), (pixelSize-1));

                        if (debugShowPieceNumbers == true) {
                            ctx.fillStyle = "white";
                            ctx.font = "10px Arial";
                            ctx.fillText(i, xOnGravityCalculationArea * pixelSize + 5, (yOnGravityCalculationArea + 1) * pixelSize + 10 + yModifierInPixels);
                        }
                    }
                }
            }
        }
    }

    // this function does the "pieceFallingAnimation" routine

    function pieceFallingRoutine() {

        // check if we have full lines, if we have them, remove them
        checkFullLineInCurrentCalculationArea();

        // if we need to set a new piece, save the old one and set a new one
        if (selectANewPieceNextFrame == true) {

            // save old one
            saveDonePiece();

            // select a new one
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
            movePieceInCalculationArea('moveDown');
        } else {
            // no, just recalculate calculationArea
            movePieceInCalculationArea('');
        }

        // if the current piece will be replaced next frame, don't draw the playArea
        if (selectANewPieceNextFrame == false) {
            // draw the pixel perfect playArea
            drawPlayAreaWithFallingPiece();
        }

        // draw the calculationArea
        // drawCurrentCalculationArea();

        // draw next pieces
        drawNextPiecesArea();
    
        // draw currentGravityCalculationArea
        drawCurrentGravityCalculationArea();
    }


    // this function does the "fullLineRemoveAnimation" routine

    function fullLineRemoveRoutine() {
        drawPlayArea();
        if (animateFullLines(fullLines) == true) {
            hideFullLines(fullLines);

            // check if any piece can fall down
            var isThereAPieceThatCanBeMoved = checkIfAnyPieceCanFallDown();
            if (isThereAPieceThatCanBeMoved == true) {
                playAreaMode = 'gravityAnimation';
            } else {
                playAreaMode = 'pieceFallingAnimation';
            }
        }
    }


    // this function does the "gravityAnimation" routine

    function gravityAnimationRoutine() {

        gravityAnimationYModifier = gravityAnimationYModifier + gravityAnimationFallingSpeed;
        if (gravityAnimationYModifier < pixelSize) {
            drawPlayAreaWithFallingPieces();
        } else {
            for (var i = 0; i < listOfPiecesThatCanBeMoved.length; i++) {
                listOfPiecesInThePlayingArea[listOfPiecesThatCanBeMoved[i]].pieceY++;
            }
            drawCurrentGravityCalculationArea();
            copyCurrentGravityCalculationAreaToCurrentCalculationArea();

            gravityAnimationYModifier = 0;

            var isThereAPieceThatCanBeMoved = checkIfAnyPieceCanFallDown();
            if (isThereAPieceThatCanBeMoved == true) {
                playAreaMode = 'gravityAnimation';
            } else {
                playAreaMode = 'pieceFallingAnimation';
            }

        }

    }


    // this is the game loop, it runs every frame

    function gameLoop() {

        switch (playAreaMode) {
            case 'pieceFallingAnimation': 
                pieceFallingRoutine();
                break;
            case 'fullLineRemoveAnimation':
                fullLineRemoveRoutine();
                break;
            case 'gravityAnimation':
                gravityAnimationRoutine();
                break;
        }

        // increase frameNumber
        frameNumber++;

        // let's restart the game loop in the next frame
        if (!stopTheGameLoop) {
            requestAnimationFrame(gameLoop);
        }
        
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

    // set playAreaMode
    playAreaMode = 'pieceFallingAnimation';

    // start the gameloop
    requestAnimationFrame(gameLoop);

console.log("end");
