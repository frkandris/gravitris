var gameWidth = 10; // how many columns do we have

var pixelSize = 20;

var blockMap = require('./includes/blockMap');
var colorRelated = require('./includes/colorRelated');

var calculationAreaDefinitions = require('./includes/calculationAreaDefinitions');
var currentCalculationArea = calculationAreaDefinitions.currentCalculationArea;
var tempCalculationArea = calculationAreaDefinitions.tempCalculationArea;
var currentGravityCalculationArea = calculationAreaDefinitions.currentGravityCalculationArea;

var statRelated = require('./includes/statRelated');

var playAreaWidth = gameWidth * pixelSize;

var fallingSpeed = 1;
var selectANewBlockNextFrame = true;
var moveCanBeDone = true;
var stopTheGameLoop = false;
var blockCounter = 0;
var frameNumber = 0;
var playAreaMode = '';
var fullLines = [];
var fullLineFadeAnimationLength = 10;
var fullLineFadeAnimationCounter = fullLineFadeAnimationLength;
var listOfBlocksThatCanBeMoved = [];
var gravityAnimationFallingSpeed = 4;
var gravityAnimationYModifier = 0;
var gameEndFadeAnimationLength = 100;
var gameEndFadeAnimationCounter = gameEndFadeAnimationLength;

var debugShowBlockNumbers = false; 

var nextBlocks = [];

var listOfBlocksInThePlayingArea = [];

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
            moveBlockInCalculationArea('rotateRight');
            event.preventDefault();
        }
        else if (e.keyCode == '40') {
            // down
            logOfEvents.push({
                frameNumber: frameNumber,
                event: 'keyPressed',
                eventValue: 'rotateLeft'
            });
            moveBlockInCalculationArea('rotateLeft');
            event.preventDefault();
        }
        else if (e.keyCode == '37') {
            // left
            logOfEvents.push({
                frameNumber: frameNumber,
                event: 'keyPressed',
                eventValue: 'moveLeft'
            });
            moveBlockInCalculationArea('moveLeft');
            event.preventDefault();
        }
        else if (e.keyCode == '39') {
            // right
            logOfEvents.push({
                frameNumber: frameNumber,
                event: 'keyPressed',
                eventValue: 'moveRight'
            });
            moveBlockInCalculationArea('moveRight');
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
                moveBlockInCalculationArea('moveDown');
            }
            event.preventDefault();
        }
    }


    // this function sets the next new block 
    // (gets the new one from the nextBlocks, adds a new random block to nextBlocks, sets coordinates of the new block)

    function selectANewBlock(){

        // get a random new block
        var newBlock = selectABlockRandomly();

        // add new item to the beginning of the array
        nextBlocks.unshift(newBlock); 

        currentBlock = nextBlocks.slice(-1).pop(); // get the last item
        nextBlocks.splice(-1,1); // remove the last item

        // set the current block
        blockIndex = currentBlock;
        rotationIndex = 0;
        xPlayArea = (playAreaWidth / 2) - (2 * pixelSize);
        yPlayArea = 0 * pixelSize;

        var moveCanBeDone = checkIfBlockOverlapsAnythingOnACalculationArea();
        if (moveCanBeDone == false) {
            playAreaMode = 'gameEndFadeOutAnimation';
            statRelated.setGameEndTime();
        }

        blockCounter++;

        logOfEvents.push({
            frameNumber: frameNumber,
            event: 'newBlock',
            eventValue: blockIndex
        });

    }


    // this function checks if a block overlaps anything on a calculation area

    function checkIfBlockOverlapsAnythingOnACalculationArea() {

        var moveCanBeDone = true;

        var blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
        var blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;

        for (var y = 0; y < blockMapNumberOfRows; y++) {
            for (var x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x;
                    if (currentCalculationArea[yOnCalculationArea][xOnCalculationArea] != 0) {
                        // move can not be done, as the block in the new position would overlap with something
                        moveCanBeDone = false;
                    }
                } 
            }
        }

        return moveCanBeDone;
    }


    // this function calculates what happens, when the block moves & rotates in currentCalculationArea

    function moveBlockInCalculationArea(direction){

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
            var numberOfRotations = Object.keys(blockMap[blockIndex]).length;
            rotationIndex++;
            if (rotationIndex == numberOfRotations) {
                rotationIndex = 0;
            }
            rotationModifier = -1;
        }
        if (direction == 'rotateRight') {
            // calculationArea modifications
            var numberOfRotations = Object.keys(blockMap[blockIndex]).length;
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

        // 1.1. remove blockMap from tempCalculationArea

        var numberOfRotations = Object.keys(blockMap[blockIndex]).length;
        rotationIndex += rotationModifier;
        if (rotationIndex < 0) {
            rotationIndex = numberOfRotations - 1;
        }
        if (rotationIndex == numberOfRotations) {
            rotationIndex = 0;
        }

        var blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
        var blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;
        for (var y = 0; y < blockMapNumberOfRows; y++) {
            for (var x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y + yCalculationAreaModifier;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x + xCalculationAreaModifier;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                } 
            }
        }

        // 1.2. test if we could add the block to tempCalculationArea without overlap or any other problems

        var numberOfRotations = Object.keys(blockMap[blockIndex]).length;
        rotationIndex -= rotationModifier;
        if (rotationIndex < 0) {
            rotationIndex = numberOfRotations - 1;
        }
        if (rotationIndex == numberOfRotations) {
            rotationIndex = 0;
        }
        var blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
        var blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;

        for (var y = 0; y < blockMapNumberOfRows; y++) {
            for (var x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x;
                    if (yOnCalculationArea > (numberOfRows - 2)) {
                        // block reached the bottom
                        selectANewBlockNextFrame = true;
                        moveCanBeDone = false;
                    }
                    if (tempCalculationArea[yOnCalculationArea][xOnCalculationArea] != 0) {
                        // move can not be done, as the block in the new position would overlap with something
                        moveCanBeDone = false;
                    }
                } 
            }
        }

        if (moveCanBeDone == true) {

            // 1.3. move can be done - remove blockMap from currentCalculationArea

            var numberOfRotations = Object.keys(blockMap[blockIndex]).length;
            rotationIndex += rotationModifier;
            if (rotationIndex < 0) {
                rotationIndex = numberOfRotations - 1;
            }
            if (rotationIndex == numberOfRotations) {
                rotationIndex = 0;
            }
            var blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
            var blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;

            for (var y = 0; y < blockMapNumberOfRows; y++) {
                for (var x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                    if (isRectangleFilled == 1) {
                        var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y + yCalculationAreaModifier;
                        var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x + xCalculationAreaModifier;
                        currentCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                    } 
                }
            }

            // 1.4. add blockMap to currentCalculationArea

            var numberOfRotations = Object.keys(blockMap[blockIndex]).length;
            rotationIndex -= rotationModifier;
            if (rotationIndex < 0) {
                rotationIndex = numberOfRotations - 1;
            }
            if (rotationIndex == numberOfRotations) {
                rotationIndex = 0;
            }
            var blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
            var blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;
            for (var y = 0; y < blockMapNumberOfRows; y++) {
                for (var x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                    if (isRectangleFilled == 1) {
                        var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y;
                        var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x;
                        currentCalculationArea[yOnCalculationArea][xOnCalculationArea] = blockIndex+1;
                    } 
                }
            }
        } // if (moveCanBeDone == true)

        else {
            // move can not be done
            
            if (direction == 'moveDown') {
                selectANewBlockNextFrame = true;
            }
            if (direction == 'moveLeft') {
                xPlayArea = xPlayArea + pixelSize;
            }
            if (direction == 'moveRight') {
                xPlayArea = xPlayArea - pixelSize;
            }
            if (direction == 'rotateLeft') {
                var numberOfRotations = Object.keys(blockMap[blockIndex]).length;
                rotationIndex--;
                if (rotationIndex < 0) {
                    rotationIndex = numberOfRotations - 1;
                }
            }
            if (direction == 'rotateRight') {
                var numberOfRotations = Object.keys(blockMap[blockIndex]).length;
                rotationIndex++;
                if (rotationIndex == numberOfRotations) {
                    rotationIndex = 0;
                }
            }            
        }
    }


    // this function returns the index of a randomly selected block

    function selectABlockRandomly() {

        var numberOfBlocks = Object.keys(blockMap).length;
        var blockIndex = Math.floor(Math.random() * numberOfBlocks);
    
        return blockIndex;
    }


    // this function draws the playArea, the shadow and the pixelperfect falling block

    function drawPlayAreaWithFallingBlock() {

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

        // remove current falling block from tempCalculationArea

        var blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
        var blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;
        for (var y = 0; y < blockMapNumberOfRows; y++) {
            for (var x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled == 1) {
                    var yOnCalculationArea = Math.floor(yPlayArea / pixelSize) + y;
                    var xOnCalculationArea = Math.floor(xPlayArea / pixelSize) + x;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                }  
            }
        }

        drawAllBlocksToPlayArea(ctx);

        // draw a the shadow of the moving block

        drawShadow();

        // draw pixelperfect moving block

        var xModifier = xPlayArea / pixelSize;
        var yModifier = yPlayArea / pixelSize;
        var yModifierInPixels = 0;
        var blockToDrawIndex = blockIndex;
        var blockToDrawRotation = rotationIndex;
        var drawEmptyLines = true;
        var blockMapToDraw = blockMap[blockToDrawIndex][blockToDrawRotation][blockToDrawRotation];
        var blockToDrawColor = colorRelated.getBlockColor(blockToDrawIndex);
        drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifier, yModifier, yModifierInPixels, drawEmptyLines);

    }


    // this function draws all blocks one by one to the playArea

    function drawAllBlocksToPlayArea(ctx) {

        // go thru the blocks one by one in listOfBlocksInThePlayingArea
        for (var i = 0; i < listOfBlocksInThePlayingArea.length; i++) {

            // draw the block
            var xModifier = listOfBlocksInThePlayingArea[i].blockX;
            var yModifier = listOfBlocksInThePlayingArea[i].blockY + 1;
            var yModifierInPixels = 0;
            var drawEmptyLines = true;
            var blockMapToDraw = listOfBlocksInThePlayingArea[i].blockMap;
            var blockToDrawColor = colorRelated.getBlockColor(listOfBlocksInThePlayingArea[i].blockIndex);
            drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifier, yModifier, yModifierInPixels, drawEmptyLines);

        }        
    }


    // this function draws the play area, sometimes with opacity

    function drawPlayArea() {

        // get the canvas
        var c = document.getElementById("playAreaCanvas");
        var ctx = c.getContext("2d");

        // clear the canvas
        ctx.clearRect(0, 0, c.width, c.height);

        // draw the canvas
        drawAllBlocksToPlayArea(ctx);

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
            statRelated.increaseNumberOfLinesCreated(fullLines.length);
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

            // modify listOfBlocksInThePlayingArea because of full line
            modifylistOfBlocksInThePlayingAreaBecauseOfFullLine(fullLine);
        }

        playAreaMode = 'gravityAnimation';

    }

    // this function draws a shadow of the block

    function drawShadow() {

        var numberOfRows = currentCalculationArea.length;

        // let's try to move the block downwards and look for overlap
        var yModifier = 0;
        do {
            var shadowCanBeMoved = true;
            var blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
            var blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;
            for (var y = 0; y < blockMapNumberOfRows; y++) {
                for (var x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
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

        // let's draw the block
        var c = document.getElementById("playAreaCanvas");
        var ctx = c.getContext("2d");

        var xModifier = Math.floor(xPlayArea / pixelSize);
        var yModifier = Math.floor(yPlayArea / pixelSize) + yModifier - 1;
        var yModifierInPixels = 0;
        var blockToDrawIndex = blockIndex;
        var blockToDrawRotation = rotationIndex;
        var drawEmptyLines = true;
        var blockMapToDraw = blockMap[blockToDrawIndex][blockToDrawRotation][blockToDrawRotation];
        var blockToDrawColor = colorRelated.getBlockColor('shadow');
        drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifier, yModifier, yModifierInPixels, drawEmptyLines);

    }


    // this function draws a block to a canvas

    function drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifier, yModifier, yModifierInPixels, drawEmptyLines) {

        var blockMapNumberOfRows = blockMapToDraw.length;
        var blockMapNumberOfColumns = blockMapToDraw[0].length;

        var lineIsEmpty = true;
        for (var y = 0; y < blockMapNumberOfRows; y++) {
            for (var x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMapToDraw[y][x];
                if (isRectangleFilled == 1) {

                    lineIsEmpty = false;

                    // determine position

                    var xOnCalculationArea = x + xModifier;
                    var yOnCalculationArea = y + yModifier;

                    // determine the color of the pixel

                    var blockColor = blockToDrawColor;
                    if (playAreaMode == 'gameEndFadeOutAnimation') {
                        var opacity = gameEndFadeAnimationCounter/gameEndFadeAnimationLength;                        
                    } else if (fullLines.includes(yOnCalculationArea - 1)) {
                        var opacity = fullLineFadeAnimationCounter/fullLineFadeAnimationLength;
                    } else {
                        opacity = 1;
                    }
                    var fillStyle = colorRelated.convertColorHexToRGB(blockColor, opacity);

                    // draw the block
                    ctx.fillStyle = fillStyle;
                    ctx.fillRect(xOnCalculationArea * pixelSize, yOnCalculationArea * pixelSize + yModifierInPixels, (pixelSize - 1), (pixelSize - 1));

                    // check if the block has another pixel on the right this one
                    try {
                        var isRightSiblingFilled = blockMapToDraw[y][x + 1];
                        if (isRightSiblingFilled == 1) {
                            ctx.fillRect(xOnCalculationArea * pixelSize + pixelSize - 1, yOnCalculationArea * pixelSize + yModifierInPixels, 1, (pixelSize - 1));
                        }
                    } catch {
                        //
                    }

                    // check if the block has another pixel underneath this one
                    try {
                        var isBottomSiblingFilled = blockMapToDraw[y + 1][x];
                        if (isBottomSiblingFilled == 1) {
                            ctx.fillRect(xOnCalculationArea * pixelSize, yOnCalculationArea * pixelSize + yModifierInPixels + pixelSize - 1, (pixelSize - 1), 1);
                        }
                    } catch {
                        //
                    }

                }
            }
            if ((drawEmptyLines == false) && (lineIsEmpty == true)) {
                yModifier--;
            }
        }
    }


    // this function draws the next blocks to the nextBlocksAreaCanvas

    function drawNextBlocksArea() {

        // let's draw the block
        var c = document.getElementById("nextBlocksAreaCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);

        for (var i = 0; i < nextBlocks.length; i++) {
            var blockToDrawIndex = nextBlocks[i];
            var blockToDrawRotation = 0;
            var xModifier = i * 5;
            var yModifier = 0;
            var yModifierInPixels = 0;
            var drawEmptyLines = false;
            var blockMapToDraw = blockMap[blockToDrawIndex][blockToDrawRotation][blockToDrawRotation];
            var blockToDrawColor = colorRelated.getBlockColor(blockToDrawIndex);
            drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifier, yModifier, yModifierInPixels, drawEmptyLines);
        }
    }


    // this function saves the block that has completed its journey to listOfBlocksInThePlayingArea

    function saveDoneBlock() {

        var blockAlreadyInserted = false;
        for (var i = 0; i < listOfBlocksInThePlayingArea.length; i++) {
            if (listOfBlocksInThePlayingArea[i].blockCounter == blockCounter) {
                blockAlreadyInserted = true;
            }
        }

        if (blockAlreadyInserted == false) {
            try {        
                listOfBlocksInThePlayingArea.push({ 
                    blockMap: blockMap[blockIndex][rotationIndex][rotationIndex],
                    blockIndex: blockIndex,
                    blockX: Math.floor(xPlayArea / pixelSize),
                    blockY: Math.floor(yPlayArea / pixelSize) - 1,
                    blockCounter: blockCounter,
                    wasChecked: false
                });
            } catch(error) { 
            }
        }
    }


    // this function calculates the currentGravityCalculationArea
    
    function calculateCurrentGravityCalculationArea() {

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
        
        // go thru the blocks one by one in listOfBlocksInThePlayingArea
        for (var i = 0; i < listOfBlocksInThePlayingArea.length; i++) {
            var blockMapNumberOfRows = Object.keys(listOfBlocksInThePlayingArea[i].blockMap).length;
            var blockMapNumberOfColumns = Object.keys(listOfBlocksInThePlayingArea[i].blockMap[0]).length;
            for (var y = 0; y < blockMapNumberOfRows; y++) {
                for (var x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                    if (isRectangleFilled == 1) {
                        // copy the map of the block to currentGravityCalculationArea
                        var yOnGravityCalculationArea = listOfBlocksInThePlayingArea[i].blockY + y;
                        var xOnGravityCalculationArea = listOfBlocksInThePlayingArea[i].blockX + x;
                        var colorOnGravityCalculationArea = listOfBlocksInThePlayingArea[i].blockIndex + 1;
                        currentGravityCalculationArea[yOnGravityCalculationArea][xOnGravityCalculationArea] = colorOnGravityCalculationArea;
                    }
                }
            }
        }
    }


    // this function modifies blocks in the listOfBlocksInThePlayingArea in case there was a full line

    function modifylistOfBlocksInThePlayingAreaBecauseOfFullLine(fullLineIndex) {

        // go thru the blocks one by one in listOfBlocksInThePlayingArea 
        // (we iterate backwards, so when we remove an item reindexing the array will not break the loop)
        for (var i = listOfBlocksInThePlayingArea.length - 1; i >= 0; i--) {
            blockIsAffected = false;
            listOfBlocksInThePlayingArea[i].wasChecked = true;
            var blockMapNumberOfRows = Object.keys(listOfBlocksInThePlayingArea[i].blockMap).length;
            var blockMapNumberOfColumns = Object.keys(listOfBlocksInThePlayingArea[i].blockMap[0]).length;
            for (var y = 0; y < blockMapNumberOfRows; y++) {
                for (var x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                    if (isRectangleFilled == 1) {
                        if (fullLineIndex == (listOfBlocksInThePlayingArea[i].blockY + y)) {
                            // the y coordinate of the pixel matches the full line row number
                            blockIsAffected = true;
                            lineAffected = y;
                        }
                    }
                }
                if (blockIsAffected == true) { break; }
            }
            if (blockIsAffected == true) {
                thereWerePixelsAboveTheCut = false;
                for (var y = 0; y < lineAffected; y++) {
                    for (var x = 0; x < blockMapNumberOfColumns; x++) {
                        isRectangleFilled = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                        if (isRectangleFilled == 1) {
                            thereWerePixelsAboveTheCut = true;
                        }
                    }
                }
                if (thereWerePixelsAboveTheCut == true) {
                    var newBlockMap = [];
                    for (var y = 0; y < lineAffected; y++) {
                        newBlockMap[y] = [];
                        for (var x = 0; x < blockMapNumberOfColumns; x++) {
                            newBlockMap[y][x] = 0;
                        }
                    }
                    listOfBlocksInThePlayingArea.push({ 
                        blockMap: newBlockMap,
                        blockIndex: listOfBlocksInThePlayingArea[i].blockIndex,
                        blockX: listOfBlocksInThePlayingArea[i].blockX,
                        blockY: listOfBlocksInThePlayingArea[i].blockY,
                        blockCounter: listOfBlocksInThePlayingArea[i].blockCounter
                    });
                    for (var y = 0; y < lineAffected; y++) {
                        for (var x = 0; x < blockMapNumberOfColumns; x++) {
                            listOfBlocksInThePlayingArea[listOfBlocksInThePlayingArea.length-1].blockMap[y][x] = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                        }
                    }    
                }
                thereWerePixelsUnderTheCut = false;
                for (var y = lineAffected + 1; y < blockMapNumberOfRows; y++) {
                    for (var x = 0; x < blockMapNumberOfColumns; x++) {
                        isRectangleFilled = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                        if (isRectangleFilled == 1) {
                            thereWerePixelsUnderTheCut = true;
                        }
                    }
                }
                if (thereWerePixelsUnderTheCut == true) {
                    var newBlockMap = [];
                    for (var y = lineAffected + 1; y < blockMapNumberOfRows; y++) {
                        newBlockMap[y - (lineAffected + 1)] = [];
                        for (var x = 0; x < blockMapNumberOfColumns; x++) {
                            newBlockMap[y - (lineAffected + 1)][x] = 0;
                        }
                    }
                    listOfBlocksInThePlayingArea.push({ 
                        blockMap: newBlockMap,
                        blockIndex: listOfBlocksInThePlayingArea[i].blockIndex,
                        blockX: listOfBlocksInThePlayingArea[i].blockX,
                        blockY: listOfBlocksInThePlayingArea[i].blockY + lineAffected + 1,
                        blockCounter: listOfBlocksInThePlayingArea[i].blockCounter
                    });
                    for (var y = lineAffected + 1; y < blockMapNumberOfRows; y++) {
                        for (var x = 0; x < blockMapNumberOfColumns; x++) {
                            listOfBlocksInThePlayingArea[listOfBlocksInThePlayingArea.length-1].blockMap[y - (lineAffected + 1)][x] = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                        }
                    }    
                }
                // remove the old item from the list
                listOfBlocksInThePlayingArea.splice(i, 1);
            }
        }

    }


    // this function checks if any of the blocks can fall down

    function checkIfAnyBlockCanFallDown() {
        
        thereWasMovementInThisRound = false;
        listOfBlocksThatCanBeMoved = [];

        // we may need to run 2 cycles to detect blocks that can fall down right after a block underneath them has fallen down
        // for (var q = 0; q < 2; q++) {
            
            // let's iterate thru all the blocks we have in listOfBlocksInThePlayingArea
            for (var i = 0; i < listOfBlocksInThePlayingArea.length; i++) {

                // clear currentGravityCalculationArea
                var numberOfRows = currentGravityCalculationArea.length;
                var numberOfColumns = currentGravityCalculationArea[0].length;
                for (var y = 0; y < numberOfRows; y++) {
                    for (var x = 0; x < numberOfColumns; x++) {
                        currentGravityCalculationArea[y][x] = 0;
                    }
                }

                // calculate currentGravityCalculationArea, without the current block
                
                // go thru the blocks one by one in listOfBlocksInThePlayingArea
                // draw every block except the one we calculate now
                for (var k = 0; k < listOfBlocksInThePlayingArea.length; k++) {
                    if (k != i) {
                        var blockMapNumberOfRows = Object.keys(listOfBlocksInThePlayingArea[k].blockMap).length;
                        var blockMapNumberOfColumns = Object.keys(listOfBlocksInThePlayingArea[k].blockMap[0]).length;
                        for (var y = 0; y < blockMapNumberOfRows; y++) {
                            for (var x = 0; x < blockMapNumberOfColumns; x++) {
                                isRectangleFilled = listOfBlocksInThePlayingArea[k].blockMap[y][x];
                                if (isRectangleFilled == 1) {

                                    // if (listOfBlocksThatCanBeMoved.includes(k)) {
                                    //     // copy the map of the block to currentGravityCalculationArea 1 line down, 
                                    //     // because it will be there in a moment and we need to figure out if anybody
                                    //     // above this block can fall down
                                    //     var yOnGravityCalculationArea = listOfBlocksInThePlayingArea[k].blockY + y + 1;
                                    // } else {
                                        // copy the map of the block to currentGravityCalculationArea
                                        var yOnGravityCalculationArea = listOfBlocksInThePlayingArea[k].blockY + y;
                                    // }
                                    var xOnGravityCalculationArea = listOfBlocksInThePlayingArea[k].blockX + x;
                                    var colorOnGravityCalculationArea = listOfBlocksInThePlayingArea[k].blockIndex + 1;
                                    currentGravityCalculationArea[yOnGravityCalculationArea][xOnGravityCalculationArea] = colorOnGravityCalculationArea;
                                }
                            }
                        }
                    }
                }

                // let's try to move the block downwards and look for overlap
                
                var numberOfRows = currentGravityCalculationArea.length;
                var numberOfColumns = currentGravityCalculationArea[0].length;
                for (var y = 0; y < numberOfRows; y++) {
                    var line = '';
                    for (var x = 0; x < numberOfColumns; x++) {
                        line = line + currentGravityCalculationArea[y][x];
                    }
                }

                var blockCanBeMoved = true;
                var yModifier = 0;
                var numberOfRows = currentGravityCalculationArea.length;
                var blockMapNumberOfRows = Object.keys(listOfBlocksInThePlayingArea[i].blockMap).length;
                var blockMapNumberOfColumns = Object.keys(listOfBlocksInThePlayingArea[i].blockMap[0]).length;

                for (var y = 0; y < blockMapNumberOfRows; y++) {
                    for (var x = 0; x < blockMapNumberOfColumns; x++) {
                        isRectangleFilled = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                        if (isRectangleFilled == 1) {
                            var yOnCalculationArea = listOfBlocksInThePlayingArea[i].blockY + y + yModifier + 1;
                            var xOnCalculationArea = listOfBlocksInThePlayingArea[i].blockX + x;
                            if (yOnCalculationArea > (numberOfRows - 2)) {
                                // block reached the bottom
                                blockCanBeMoved = false;
                                break;
                            }
                            if (currentGravityCalculationArea[yOnCalculationArea][xOnCalculationArea] != 0) {
                                // block collided with another block
                                blockCanBeMoved = false;
                            }
                            if (blockCanBeMoved == true) {
                                // no problem
                            }
                        } 
                    }
                }
                if (blockCanBeMoved == true) {
                    listOfBlocksThatCanBeMoved.push(i);
                    // yModifier++;
                    // listOfBlocksInThePlayingArea[i].blockY++;
                    thereWasMovementInThisRound = true;
                } else {
                    // block could not be moved
                }
            }
        // }


        calculateCurrentGravityCalculationArea();

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


    // this function draws the currentGravityCalculationField with falling blocks

    function drawPlayAreaWithFallingBlocks() {

        // clear the canvas
        var c = document.getElementById("playAreaCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        
        // go thru the blocks one by one in listOfBlocksInThePlayingArea
        for (var i = 0; i < listOfBlocksInThePlayingArea.length; i++) {

            var xModifier = listOfBlocksInThePlayingArea[i].blockX;
            var yModifier = listOfBlocksInThePlayingArea[i].blockY + 1;
            var drawEmptyLines = true;
            var blockMapToDraw = listOfBlocksInThePlayingArea[i].blockMap;
            var blockToDrawColor = colorRelated.getBlockColor(listOfBlocksInThePlayingArea[i].blockIndex);
            if (listOfBlocksThatCanBeMoved.includes(i)) {
                yModifierInPixels = gravityAnimationYModifier;
            } else {
                yModifierInPixels = 0;
            }
            drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifier, yModifier, yModifierInPixels, drawEmptyLines);
        }
    }

    
    // this function does the "blockFallingAnimation" routine

    function blockFallingRoutine() {

        // check if we have full lines, if we have them, remove them
        checkFullLineInCurrentCalculationArea();

        // if we need to set a new block, save the old one and set a new one
        if (selectANewBlockNextFrame == true) {

            // save old one
            saveDoneBlock();

            // select a new one
            selectANewBlock();
            selectANewBlockNextFrame = false;
        }
        
        // let's move the current block down

        // y previously in the calculationArea
        previousYCalculationArea = Math.floor(yPlayArea / pixelSize);
        // y in the playArea
        yPlayArea = yPlayArea + fallingSpeed;
        // y now in the calculationArea
        currentYCalculationArea = Math.floor(yPlayArea / pixelSize);
        // do we need to move down the block in the calculationArea
        if (previousYCalculationArea != currentYCalculationArea) {
            // yes, try to do the move in calculationArea
            moveBlockInCalculationArea('moveDown');
        } else {
            // no, just recalculate calculationArea
            moveBlockInCalculationArea('');
        }

        // if the current block will be replaced next frame, don't draw the playArea
        if (selectANewBlockNextFrame == false) {
            // draw the pixel perfect playArea
            drawPlayAreaWithFallingBlock();
        }

        // draw next blocks
        drawNextBlocksArea();
    
        // draw currentGravityCalculationArea
        calculateCurrentGravityCalculationArea();
    }


    // this function does the "fullLineRemoveAnimation" routine

    function fullLineRemoveRoutine() {
        drawPlayArea();
        if (animateFullLines(fullLines) == true) {
            hideFullLines(fullLines);

            // check if any block can fall down
            var isThereABlockThatCanBeMoved = checkIfAnyBlockCanFallDown();
            if (isThereABlockThatCanBeMoved == true) {
                playAreaMode = 'gravityAnimation';
            } else {
                playAreaMode = 'blockFallingAnimation';
            }
        }
    }


    // this function does the "gravityAnimation" routine

    function gravityAnimationRoutine() {

        gravityAnimationYModifier = gravityAnimationYModifier + gravityAnimationFallingSpeed;
        if (gravityAnimationYModifier < pixelSize) {
            drawPlayAreaWithFallingBlocks();
        } else {
            for (var i = 0; i < listOfBlocksThatCanBeMoved.length; i++) {
                listOfBlocksInThePlayingArea[listOfBlocksThatCanBeMoved[i]].blockY++;
            }
            calculateCurrentGravityCalculationArea();
            copyCurrentGravityCalculationAreaToCurrentCalculationArea();

            gravityAnimationYModifier = 0;

            var isThereABlockThatCanBeMoved = checkIfAnyBlockCanFallDown();
            if (isThereABlockThatCanBeMoved == true) {
                playAreaMode = 'gravityAnimation';
            } else {
                playAreaMode = 'blockFallingAnimation';
            }

        }

    }


    function gameEndAnimationRoutine() {

        // no more moves
        document.onkeydown = null;

        // draw the play area
        drawPlayArea();

        // increase opacity
        gameEndFadeAnimationCounter--;

        // check if everything has faded out properly
        if (gameEndFadeAnimationCounter == 0) {

            gameEndFadeAnimationCounter = gameEndFadeAnimationLength;
            
            statRelated.displayGameEndStats(blockCounter);

            $('#gamestartbutton').css('visibility','visible');
            
            // stop the game loop
            stopTheGameLoop = true;

            
        } else {
            // 
        }

    }


    // this is the game loop, it runs every frame

    function gameLoop() {

        switch (playAreaMode) {
            case 'blockFallingAnimation': 
                blockFallingRoutine();
                break;
            case 'fullLineRemoveAnimation':
                fullLineRemoveRoutine();
                break;
            case 'gravityAnimation':
                gravityAnimationRoutine();
                break;
            case 'gameEndFadeOutAnimation':
                gameEndAnimationRoutine();
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

// let's generate the first 3 blocks
blockIndex = selectABlockRandomly();
nextBlocks.unshift(blockIndex);
blockIndex = selectABlockRandomly();
nextBlocks.unshift(blockIndex);
blockIndex = selectABlockRandomly();
nextBlocks.unshift(blockIndex);

// set playAreaMode
playAreaMode = 'blockFallingAnimation';

// record game start time
statRelated.setGameStartTime();

// start the gameloop
requestAnimationFrame(gameLoop);