const gameLevelEnvironment = require('./includes/gameLevelEnvironment');
const playerLevelEnvironment = require('./includes/playerLevelEnvironment');

const blockMap = require('./includes/blockMap');
const colorRelated = require('./includes/colorRelated');

const calculationAreaDefinitions = require('./includes/calculationAreaDefinitions');
const currentCalculationArea = calculationAreaDefinitions.currentCalculationArea;
const tempCalculationArea = calculationAreaDefinitions.tempCalculationArea;
const currentGravityCalculationArea = calculationAreaDefinitions.currentGravityCalculationArea;

const statRelated = require('./includes/statRelated');

const drawBlock = require('./includes/drawBlock');


let gravityAnimationYModifier = 0;
let nextBlocks = [];
let listOfBlocksInThePlayingArea = [];
let logOfEvents = [];

    // this function handles the keyboard events

    function checkKeyboardInput(e) {
        e = e || window.event;
        if (e.keyCode === 38) {
            // up
            logOfEvents.push({
                frameNumber: playerLevelEnvironment.frameNumber,
                event: 'keyPressed',
                eventValue: 'rotateRight'
            });
            moveBlockInCalculationArea('rotateRight');
            event.preventDefault();
        }
        else if (e.keyCode === 40) {
            // down
            logOfEvents.push({
                frameNumber: playerLevelEnvironment.frameNumber,
                event: 'keyPressed',
                eventValue: 'rotateLeft'
            });
            moveBlockInCalculationArea('rotateLeft');
            event.preventDefault();
        }
        else if (e.keyCode === 37) {
            // left
            logOfEvents.push({
                frameNumber: playerLevelEnvironment.frameNumber,
                event: 'keyPressed',
                eventValue: 'moveLeft'
            });
            moveBlockInCalculationArea('moveLeft');
            event.preventDefault();
        }
        else if (e.keyCode === 39) {
            // right
            logOfEvents.push({
                frameNumber: playerLevelEnvironment.frameNumber,
                event: 'keyPressed',
                eventValue: 'moveRight'
            });
            moveBlockInCalculationArea('moveRight');
            event.preventDefault();
        }
        else if (e.keyCode === 32) {
            // space
            logOfEvents.push({
                frameNumber: playerLevelEnvironment.frameNumber,
                event: 'keyPressed',
                eventValue: 'instantDrop'
            });
            // instant drop
            while (playerLevelEnvironment.moveCanBeDone === true) {
                yPlayArea = yPlayArea + gameLevelEnvironment.pixelSize;
                moveBlockInCalculationArea('moveDown');
            }
            event.preventDefault();
        }
    }


    // this function sets the next new block
    // (gets the new one from the nextBlocks, adds a new random block to nextBlocks, sets coordinates of the new block)

    function selectANewBlock(){

        // get a random new block
        const newBlock = selectABlockRandomly();

        // add new item to the beginning of the array
        nextBlocks.unshift(newBlock);

        let currentBlock = nextBlocks.slice(-1).pop(); // get the last item
        nextBlocks.splice(-1,1); // remove the last item

        // set the current block
        blockIndex = currentBlock;
        rotationIndex = 0;
        xPlayArea = (gameLevelEnvironment.playAreaWidth / 2) - (2 * gameLevelEnvironment.pixelSize);
        yPlayArea = 0;

        playerLevelEnvironment.moveCanBeDone = checkIfBlockOverlapsAnythingOnACalculationArea();
        if (playerLevelEnvironment.moveCanBeDone === false) {
            playerLevelEnvironment.playAreaMode = 'gameEndFadeOutAnimation';
            statRelated.setGameEndTime();
        }

        playerLevelEnvironment.blockCounter++;

        logOfEvents.push({
            frameNumber: playerLevelEnvironment.frameNumber,
            event: 'newBlock',
            eventValue: blockIndex
        });

    }


    // this function checks if a block overlaps anything on a calculation area

    function checkIfBlockOverlapsAnythingOnACalculationArea() {

        let moveCanBeDone = true;

        const blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
        const blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;

        let isRectangleFilled;
        for (let y = 0; y < blockMapNumberOfRows; y++) {
            for (let x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled === 1) {
                    const yOnCalculationArea = Math.floor(yPlayArea / gameLevelEnvironment.pixelSize) + y;
                    const xOnCalculationArea = Math.floor(xPlayArea / gameLevelEnvironment.pixelSize) + x;
                    if (currentCalculationArea[yOnCalculationArea][xOnCalculationArea] !== 0) {
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
        let xOnCalculationArea;
        let yOnCalculationArea;
        let x;
        let y;
        let xCalculationAreaModifier = 0;
        let yCalculationAreaModifier = 0;
        let rotationModifier = 0;
        let isRectangleFilled;

        let numberOfRotations = Object.keys(blockMap[blockIndex]).length;

        if (direction === 'moveDown') {
            // calculationArea modifications
            yCalculationAreaModifier = -1;
        }
        if (direction === 'moveLeft') {
            // calculationArea modifications
            xCalculationAreaModifier = 1;
            // playArea modifications
            xPlayArea = xPlayArea - gameLevelEnvironment.pixelSize;
        }
        if (direction === 'moveRight') {
            // calculationArea modifications
            xCalculationAreaModifier = -1;
            // playArea modifications
            xPlayArea = xPlayArea + gameLevelEnvironment.pixelSize;
        }
        if (direction === 'rotateLeft') {
            // calculationArea modifications
            rotationIndex++;
            if (rotationIndex === numberOfRotations) {
                rotationIndex = 0;
            }
            rotationModifier = -1;
        }
        if (direction === 'rotateRight') {
            // calculationArea modifications
            rotationIndex--;
            if (rotationIndex < 0) {
                rotationIndex = numberOfRotations - 1;
            }
            rotationModifier = 1;
        }
        if (direction === "") {
            // do nothing
        }

        // test if we can make the move

        playerLevelEnvironment.moveCanBeDone = true;

        // 1.0. copy currentCalculationArea to tempCalculationArea

        const numberOfRows = currentCalculationArea.length;
        const numberOfColumns = currentCalculationArea[0].length;
        for (let y = 0; y < numberOfRows; y++) {
            for (let x = 0; x < numberOfColumns; x++) {
                tempCalculationArea[y][x] = currentCalculationArea[y][x];
            }
        }

        // 1.1. remove blockMap from tempCalculationArea

        rotationIndex += rotationModifier;
        if (rotationIndex < 0) {
            rotationIndex = numberOfRotations - 1;
        }
        if (rotationIndex === numberOfRotations) {
            rotationIndex = 0;
        }

        let blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
        let blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;
        for (y = 0; y < blockMapNumberOfRows; y++) {
            for (x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled === 1) {
                    yOnCalculationArea = Math.floor(yPlayArea / gameLevelEnvironment.pixelSize) + y + yCalculationAreaModifier;
                    xOnCalculationArea = Math.floor(xPlayArea / gameLevelEnvironment.pixelSize) + x + xCalculationAreaModifier;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                }
            }
        }

        // 1.2. test if we could add the block to tempCalculationArea without overlap or any other problems

        rotationIndex -= rotationModifier;
        if (rotationIndex < 0) {
            rotationIndex = numberOfRotations - 1;
        }
        if (rotationIndex === numberOfRotations) {
            rotationIndex = 0;
        }
        blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
        blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;

        for (y = 0; y < blockMapNumberOfRows; y++) {
            for (x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled === 1) {
                    yOnCalculationArea = Math.floor(yPlayArea / gameLevelEnvironment.pixelSize) + y;
                    xOnCalculationArea = Math.floor(xPlayArea / gameLevelEnvironment.pixelSize) + x;
                    if (yOnCalculationArea > (numberOfRows - 2)) {
                        // block reached the bottom
                        playerLevelEnvironment.selectANewBlockNextFrame = true;
                        playerLevelEnvironment.moveCanBeDone = false;
                    }
                    if (tempCalculationArea[yOnCalculationArea][xOnCalculationArea] !== 0) {
                        // move can not be done, as the block in the new position would overlap with something
                        playerLevelEnvironment.moveCanBeDone = false;
                    }
                }
            }
        }

        if (playerLevelEnvironment.moveCanBeDone === true) {

            // 1.3. move can be done - remove blockMap from currentCalculationArea

            rotationIndex += rotationModifier;
            if (rotationIndex < 0) {
                rotationIndex = numberOfRotations - 1;
            }
            if (rotationIndex === numberOfRotations) {
                rotationIndex = 0;
            }
            blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
            blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;

            for (y = 0; y < blockMapNumberOfRows; y++) {
                for (x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                    if (isRectangleFilled === 1) {
                        yOnCalculationArea = Math.floor(yPlayArea / gameLevelEnvironment.pixelSize) + y + yCalculationAreaModifier;
                        xOnCalculationArea = Math.floor(xPlayArea / gameLevelEnvironment.pixelSize) + x + xCalculationAreaModifier;
                        currentCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                    }
                }
            }

            // 1.4. add blockMap to currentCalculationArea

            rotationIndex -= rotationModifier;
            if (rotationIndex < 0) {
                rotationIndex = numberOfRotations - 1;
            }
            if (rotationIndex === numberOfRotations) {
                rotationIndex = 0;
            }
            blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
            blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;
            for (y = 0; y < blockMapNumberOfRows; y++) {
                for (x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                    if (isRectangleFilled === 1) {
                        yOnCalculationArea = Math.floor(yPlayArea / gameLevelEnvironment.pixelSize) + y;
                        xOnCalculationArea = Math.floor(xPlayArea / gameLevelEnvironment.pixelSize) + x;
                        currentCalculationArea[yOnCalculationArea][xOnCalculationArea] = blockIndex+1;
                    }
                }
            }
        } // if (playerLevelEnvironment.moveCanBeDone === true)

        else {
            // move can not be done

            if (direction === 'moveDown') {
                playerLevelEnvironment.selectANewBlockNextFrame = true;
            }
            if (direction === 'moveLeft') {
                xPlayArea = xPlayArea + gameLevelEnvironment.pixelSize;
            }
            if (direction === 'moveRight') {
                xPlayArea = xPlayArea - gameLevelEnvironment.pixelSize;
            }
            if (direction === 'rotateLeft') {
                rotationIndex--;
                if (rotationIndex < 0) {
                    rotationIndex = numberOfRotations - 1;
                }
            }
            if (direction === 'rotateRight') {
                rotationIndex++;
                if (rotationIndex === numberOfRotations) {
                    rotationIndex = 0;
                }
            }
        }
    }


    // this function returns the index of a randomly selected block

    function selectABlockRandomly() {

        let numberOfBlocks = Object.keys(blockMap).length;
        return Math.floor(Math.random() * numberOfBlocks);

    }


    // this function draws the playArea, the shadow and the pixelperfect falling block

    function drawPlayAreaWithFallingBlock() {

        let x;
        let y;
        const c = document.getElementById("playAreaCanvas");
        const ctx = c.getContext("2d");

        ctx.clearRect(0, 0, c.width, c.height);

        // copy currentCalculationArea to tempCalculationArea

        const numberOfRows = currentCalculationArea.length;
        const numberOfColumns = currentCalculationArea[0].length;
        for (y = 0; y < numberOfRows; y++) {
            for (x = 0; x < numberOfColumns; x++) {
                tempCalculationArea[y][x] = currentCalculationArea[y][x];
            }
        }

        // remove current falling block from tempCalculationArea

        const blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
        const blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;
        let isRectangleFilled;
        for (y = 0; y < blockMapNumberOfRows; y++) {
            for (x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                if (isRectangleFilled === 1) {
                    const yOnCalculationArea = Math.floor(yPlayArea / gameLevelEnvironment.pixelSize) + y;
                    const xOnCalculationArea = Math.floor(xPlayArea / gameLevelEnvironment.pixelSize) + x;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                }
            }
        }

        drawAllBlocksToPlayArea(ctx);

        // draw a the shadow of the moving block

        drawShadow();

        // draw pixelperfect moving block

        const xModifierInSquares = xPlayArea / gameLevelEnvironment.pixelSize;
        const yModifierInSquares = yPlayArea / gameLevelEnvironment.pixelSize;
        const yModifierInPixels = 0;
        const blockToDrawIndex = blockIndex;
        const blockToDrawRotation = rotationIndex;
        const drawEmptyLines = true;
        const blockMapToDraw = blockMap[blockToDrawIndex][blockToDrawRotation][blockToDrawRotation];
        const blockToDrawColor = colorRelated.getBlockColor(blockToDrawIndex);
        drawBlock.drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifierInSquares, yModifierInSquares, yModifierInPixels, drawEmptyLines, playerLevelEnvironment.playAreaMode, playerLevelEnvironment.fullLines, playerLevelEnvironment.gameEndFadeAnimationCounter, gameLevelEnvironment.gameEndFadeAnimationLength, playerLevelEnvironment.fullLineFadeAnimationCounter, gameLevelEnvironment.fullLineFadeAnimationLength);

    }


    // this function draws all blocks one by one to the playArea

    function drawAllBlocksToPlayArea(ctx) {

        // go thru the blocks one by one in listOfBlocksInThePlayingArea
        for (let i = 0; i < listOfBlocksInThePlayingArea.length; i++) {

            // draw the block
            const xModifierInSquares = listOfBlocksInThePlayingArea[i].blockX;
            const yModifierInSquares = listOfBlocksInThePlayingArea[i].blockY + 1;
            const yModifierInPixels = 0;
            const drawEmptyLines = true;
            const blockMapToDraw = listOfBlocksInThePlayingArea[i].blockMap;
            const blockToDrawColor = colorRelated.getBlockColor(listOfBlocksInThePlayingArea[i].blockIndex);
            drawBlock.drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifierInSquares, yModifierInSquares, yModifierInPixels, drawEmptyLines, playerLevelEnvironment.playAreaMode, playerLevelEnvironment.fullLines, playerLevelEnvironment.gameEndFadeAnimationCounter, gameLevelEnvironment.gameEndFadeAnimationLength, playerLevelEnvironment.fullLineFadeAnimationCounter, gameLevelEnvironment.fullLineFadeAnimationLength);

        }
    }


    // this function draws the play area, sometimes with opacity

    function drawPlayArea() {

        // get the canvas
        const c = document.getElementById("playAreaCanvas");
        const ctx = c.getContext("2d");

        // clear the canvas
        ctx.clearRect(0, 0, c.width, c.height);

        // draw the canvas
        drawAllBlocksToPlayArea(ctx);

    }


    // this function checks if we have full lines in the calculationArea and removes them

    function checkFullLineInCurrentCalculationArea(){

        playerLevelEnvironment.fullLines = [];
        let fullLineFound = false;

        const numberOfRows = currentCalculationArea.length;
        const numberOfColumns = currentCalculationArea[0].length;

        // let's check all rows for full lines
        let numberOfFilledRectanglesInRow;
        let isRectangleFilled;
        for (let i = 0; i < numberOfRows; i++) {
            numberOfFilledRectanglesInRow = 0;
            for (let j = 0; j < numberOfColumns; j++) {
                isRectangleFilled = currentCalculationArea[i][j];
                if (isRectangleFilled > 0) {
                    numberOfFilledRectanglesInRow++;
                }
            }
            if (numberOfFilledRectanglesInRow === numberOfColumns) {
                // we've found a full line in row i
                fullLineFound = true;
                playerLevelEnvironment.fullLines.push(i);
            }
        }
        if (fullLineFound === true) {
            playerLevelEnvironment.playAreaMode = 'fullLineRemoveAnimation';
            statRelated.increaseNumberOfLinesCreated(playerLevelEnvironment.fullLines.length);
        }
    }


    // this function animates the full lines, until they are nonvisible

    function animateFullLines() {

        playerLevelEnvironment.fullLineFadeAnimationCounter--;

        if (playerLevelEnvironment.fullLineFadeAnimationCounter === 0) {
            playerLevelEnvironment.fullLineFadeAnimationCounter = gameLevelEnvironment.fullLineFadeAnimationLength;
            return true;
        } else {
            return false;
        }
    }


    // this function removes the full lines

    function hideFullLines(fullLines) {

        const numberOfColumns = currentCalculationArea[0].length;

        let fullLine;
        for (let p = 0; p < fullLines.length; p++) {

            let l;
            fullLine = fullLines[p];

            // remove it
            for (l = 0; l < numberOfColumns; l++) {
                currentCalculationArea[fullLine][l] = 0;
                currentCalculationArea[0][l] = 0;
            }
            // move everything above the line 1 row down
            for (let k = fullLine; k > 0; k--) {
                for (l = 0; l < numberOfColumns; l++) {
                    currentCalculationArea[k][l] = currentCalculationArea[k - 1][l];
                }
            }

            // modify listOfBlocksInThePlayingArea because of full line
            modifylistOfBlocksInThePlayingAreaBecauseOfFullLine(fullLine);
        }

        playerLevelEnvironment.playAreaMode = 'gravityAnimation';

    }


    // this function draws a shadow of the block

    function drawShadow() {

        // let's try to move the block downwards and look for overlap

        const numberOfRows = currentCalculationArea.length;
        let shadowCanBeMoved;
        let yModifier = 0;
        let isRectangleFilled;
        do {
            shadowCanBeMoved = true;
            const blockMapNumberOfRows = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex]).length;
            const blockMapNumberOfColumns = Object.keys(blockMap[blockIndex][rotationIndex][rotationIndex][0]).length;
            for (let y = 0; y < blockMapNumberOfRows; y++) {
                for (let x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = blockMap[blockIndex][rotationIndex][rotationIndex][y][x];
                    if (isRectangleFilled === 1) {
                        const yOnCalculationArea = Math.floor(yPlayArea / gameLevelEnvironment.pixelSize) + y + yModifier;
                        const xOnCalculationArea = Math.floor(xPlayArea / gameLevelEnvironment.pixelSize) + x;
                        if (yOnCalculationArea > (numberOfRows - 2)) {
                            shadowCanBeMoved = false;
                        }
                        if (tempCalculationArea[yOnCalculationArea][xOnCalculationArea] !== 0) {
                            shadowCanBeMoved = false;
                        }
                    }
                }
            }
            yModifier++;
        }
        while (shadowCanBeMoved === true);

        // let's draw the block
        const c = document.getElementById("playAreaCanvas");
        const ctx = c.getContext("2d");

        const xModifierInSquares = Math.floor(xPlayArea / gameLevelEnvironment.pixelSize);
        const yModifierInSquares = Math.floor(yPlayArea / gameLevelEnvironment.pixelSize) + yModifier - 1;
        const yModifierInPixels = 0;
        const blockToDrawIndex = blockIndex;
        const blockToDrawRotation = rotationIndex;
        const drawEmptyLines = true;
        const blockMapToDraw = blockMap[blockToDrawIndex][blockToDrawRotation][blockToDrawRotation];
        const blockToDrawColor = colorRelated.getBlockColor('shadow');
        drawBlock.drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifierInSquares, yModifierInSquares, yModifierInPixels, drawEmptyLines, playerLevelEnvironment.playAreaMode, playerLevelEnvironment.fullLines, playerLevelEnvironment.gameEndFadeAnimationCounter, gameLevelEnvironment.gameEndFadeAnimationLength, playerLevelEnvironment.fullLineFadeAnimationCounter, gameLevelEnvironment.fullLineFadeAnimationLength);

    }


    // this function draws the next blocks to the nextBlocksAreaCanvas

    function drawNextBlocksArea() {

        // let's draw the block
        const c = document.getElementById("nextBlocksAreaCanvas");
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);

        for (let i = 0; i < nextBlocks.length; i++) {
            const blockToDrawIndex = nextBlocks[i];
            const blockToDrawRotation = 0;
            const xModifierInSquares = i * 5;
            const yModifierInSquares = 0;
            const yModifierInPixels = 0;
            const drawEmptyLines = false;
            const blockMapToDraw = blockMap[blockToDrawIndex][blockToDrawRotation][blockToDrawRotation];
            const blockToDrawColor = colorRelated.getBlockColor(blockToDrawIndex);
            drawBlock.drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifierInSquares, yModifierInSquares, yModifierInPixels, drawEmptyLines, playerLevelEnvironment.playAreaMode, playerLevelEnvironment.fullLines, playerLevelEnvironment.gameEndFadeAnimationCounter, gameLevelEnvironment.gameEndFadeAnimationLength, playerLevelEnvironment.fullLineFadeAnimationCounter, gameLevelEnvironment.fullLineFadeAnimationLength);
        }
    }


    // this function saves the block that has completed its journey to listOfBlocksInThePlayingArea

    function saveDoneBlock() {

        let blockAlreadyInserted = false;
        for (let i = 0; i < listOfBlocksInThePlayingArea.length; i++) {
            if (listOfBlocksInThePlayingArea[i].blockCounter === playerLevelEnvironment.blockCounter) {
                blockAlreadyInserted = true;
            }
        }

        if (blockAlreadyInserted === false) {
            try {
                listOfBlocksInThePlayingArea.push({
                    blockMap: blockMap[blockIndex][rotationIndex][rotationIndex],
                    blockIndex: blockIndex,
                    blockX: Math.floor(xPlayArea / gameLevelEnvironment.pixelSize),
                    blockY: Math.floor(yPlayArea / gameLevelEnvironment.pixelSize) - 1,
                    blockCounter: playerLevelEnvironment.blockCounter,
                    wasChecked: false
                });
            } catch(error) {
            }
        }
    }


    // this function calculates the currentGravityCalculationArea

    function calculateCurrentGravityCalculationArea() {

        let x;
        let y;

        // clear currentGravityCalculationArea
        const numberOfRows = currentGravityCalculationArea.length;
        const numberOfColumns = currentGravityCalculationArea[0].length;
        for (y = 0; y < numberOfRows; y++) {
            for (x = 0; x < numberOfColumns; x++) {
                currentGravityCalculationArea[y][x] = 0;
            }
        }

        // clear the canvas
        const c = document.getElementById("currentGravityCalculationAreaCanvas");
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);

        // go thru the blocks one by one in listOfBlocksInThePlayingArea
        let isRectangleFilled;
        for (let i = 0; i < listOfBlocksInThePlayingArea.length; i++) {
            const blockMapNumberOfRows = Object.keys(listOfBlocksInThePlayingArea[i].blockMap).length;
            const blockMapNumberOfColumns = Object.keys(listOfBlocksInThePlayingArea[i].blockMap[0]).length;
            for (y = 0; y < blockMapNumberOfRows; y++) {
                for (x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                    if (isRectangleFilled === 1) {
                        // copy the map of the block to currentGravityCalculationArea
                        const yOnGravityCalculationArea = listOfBlocksInThePlayingArea[i].blockY + y;
                        const xOnGravityCalculationArea = listOfBlocksInThePlayingArea[i].blockX + x;
                        let colorOnGravityCalculationArea = listOfBlocksInThePlayingArea[i].blockIndex + 1;
                        currentGravityCalculationArea[yOnGravityCalculationArea][xOnGravityCalculationArea] = colorOnGravityCalculationArea;
                    }
                }
            }
        }
    }


    // this function modifies blocks in the listOfBlocksInThePlayingArea in case there was a full line

    function modifylistOfBlocksInThePlayingAreaBecauseOfFullLine(fullLineIndex) {

        let newBlockMap;
        let x;
        let y;

        // go thru the blocks one by one in listOfBlocksInThePlayingArea
        // (we iterate backwards, so when we remove an item reindexing the array will not break the loop)
        let blockIsAffected;
        let isRectangleFilled;
        let lineAffected;
        let thereWerePixelsAboveTheCut;
        let thereWerePixelsUnderTheCut;
        for (let i = listOfBlocksInThePlayingArea.length - 1; i >= 0; i--) {
            blockIsAffected = false;
            listOfBlocksInThePlayingArea[i].wasChecked = true;
            const blockMapNumberOfRows = Object.keys(listOfBlocksInThePlayingArea[i].blockMap).length;
            const blockMapNumberOfColumns = Object.keys(listOfBlocksInThePlayingArea[i].blockMap[0]).length;
            for (y = 0; y < blockMapNumberOfRows; y++) {
                for (x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                    if (isRectangleFilled === 1) {
                        if (fullLineIndex === (listOfBlocksInThePlayingArea[i].blockY + y)) {
                            // the y coordinate of the pixel matches the full line row number
                            blockIsAffected = true;
                            lineAffected = y;
                        }
                    }
                }
                if (blockIsAffected === true) {
                    break;
                }
            }
            if (blockIsAffected === true) {
                thereWerePixelsAboveTheCut = false;
                for (y = 0; y < lineAffected; y++) {
                    for (x = 0; x < blockMapNumberOfColumns; x++) {
                        isRectangleFilled = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                        if (isRectangleFilled === 1) {
                            thereWerePixelsAboveTheCut = true;
                        }
                    }
                }
                if (thereWerePixelsAboveTheCut === true) {
                    newBlockMap = [];
                    for (y = 0; y < lineAffected; y++) {
                        newBlockMap[y] = [];
                        for (x = 0; x < blockMapNumberOfColumns; x++) {
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
                    for (y = 0; y < lineAffected; y++) {
                        for (x = 0; x < blockMapNumberOfColumns; x++) {
                            listOfBlocksInThePlayingArea[listOfBlocksInThePlayingArea.length - 1].blockMap[y][x] = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                        }
                    }
                }
                thereWerePixelsUnderTheCut = false;
                for (y = lineAffected + 1; y < blockMapNumberOfRows; y++) {
                    for (x = 0; x < blockMapNumberOfColumns; x++) {
                        isRectangleFilled = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                        if (isRectangleFilled === 1) {
                            thereWerePixelsUnderTheCut = true;
                        }
                    }
                }
                if (thereWerePixelsUnderTheCut === true) {
                    newBlockMap = [];
                    for (y = lineAffected + 1; y < blockMapNumberOfRows; y++) {
                        newBlockMap[y - (lineAffected + 1)] = [];
                        for (x = 0; x < blockMapNumberOfColumns; x++) {
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
                    for (y = lineAffected + 1; y < blockMapNumberOfRows; y++) {
                        for (x = 0; x < blockMapNumberOfColumns; x++) {
                            listOfBlocksInThePlayingArea[listOfBlocksInThePlayingArea.length - 1].blockMap[y - (lineAffected + 1)][x] = listOfBlocksInThePlayingArea[i].blockMap[y][x];
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

        let blockMapNumberOfColumns;
        let blockMapNumberOfRows;
        let x;
        let y;
        let thereWasMovementInThisRound = false;
        playerLevelEnvironment.listOfBlocksThatCanBeMoved = [];

        // let's iterate thru all the blocks we have in listOfBlocksInThePlayingArea
        let isRectangleFilled;
        for (let i = 0; i < listOfBlocksInThePlayingArea.length; i++) {

            // clear currentGravityCalculationArea
            let numberOfRows = currentGravityCalculationArea.length;
            let numberOfColumns = currentGravityCalculationArea[0].length;
            for (y = 0; y < numberOfRows; y++) {
                for (x = 0; x < numberOfColumns; x++) {
                    currentGravityCalculationArea[y][x] = 0;
                }
            }

            // calculate currentGravityCalculationArea, without the current block

            // go thru the blocks one by one in listOfBlocksInThePlayingArea
            // draw every block except the one we calculate now
            for (let k = 0; k < listOfBlocksInThePlayingArea.length; k++) {
                if (k !== i) {
                    blockMapNumberOfRows = Object.keys(listOfBlocksInThePlayingArea[k].blockMap).length;
                    blockMapNumberOfColumns = Object.keys(listOfBlocksInThePlayingArea[k].blockMap[0]).length;
                    for (y = 0; y < blockMapNumberOfRows; y++) {
                        for (x = 0; x < blockMapNumberOfColumns; x++) {
                            isRectangleFilled = listOfBlocksInThePlayingArea[k].blockMap[y][x];
                            if (isRectangleFilled === 1) {
                                const yOnGravityCalculationArea = listOfBlocksInThePlayingArea[k].blockY + y;
                                const xOnGravityCalculationArea = listOfBlocksInThePlayingArea[k].blockX + x;
                                const colorOnGravityCalculationArea = listOfBlocksInThePlayingArea[k].blockIndex + 1;
                                currentGravityCalculationArea[yOnGravityCalculationArea][xOnGravityCalculationArea] = colorOnGravityCalculationArea;
                            }
                        }
                    }
                }
            }

            // let's try to move the block downwards and look for overlap

            numberOfRows = currentGravityCalculationArea.length;
            numberOfColumns = currentGravityCalculationArea[0].length;
            for (y = 0; y < numberOfRows; y++) {
                let line = '';
                for (x = 0; x < numberOfColumns; x++) {
                    line = line + currentGravityCalculationArea[y][x];
                }
            }

            let blockCanBeMoved = true;
            const yModifier = 0;
            numberOfRows = currentGravityCalculationArea.length;
            blockMapNumberOfRows = Object.keys(listOfBlocksInThePlayingArea[i].blockMap).length;
            blockMapNumberOfColumns = Object.keys(listOfBlocksInThePlayingArea[i].blockMap[0]).length;

            for (y = 0; y < blockMapNumberOfRows; y++) {
                for (x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = listOfBlocksInThePlayingArea[i].blockMap[y][x];
                    if (isRectangleFilled === 1) {
                        const yOnCalculationArea = listOfBlocksInThePlayingArea[i].blockY + y + yModifier + 1;
                        const xOnCalculationArea = listOfBlocksInThePlayingArea[i].blockX + x;
                        if (yOnCalculationArea > (numberOfRows - 2)) {
                            // block reached the bottom
                            blockCanBeMoved = false;
                            break;
                        }
                        if (currentGravityCalculationArea[yOnCalculationArea][xOnCalculationArea] !== 0) {
                            // block collided with another block
                            blockCanBeMoved = false;
                        }
                        if (blockCanBeMoved === true) {
                            // no problem
                        }
                    }
                }
            }
            if (blockCanBeMoved === true) {
                playerLevelEnvironment.listOfBlocksThatCanBeMoved.push(i);
                thereWasMovementInThisRound = true;
            } else {
                // block could not be moved
            }
        }

        calculateCurrentGravityCalculationArea();

        return thereWasMovementInThisRound;
    }


    // this function copies the currentGravityCalculationArea to currentCalculationArea

    function copyCurrentGravityCalculationAreaToCurrentCalculationArea() {
        const numberOfRows = currentGravityCalculationArea.length;
        const numberOfColumns = currentGravityCalculationArea[0].length;
        for (let y = 0; y < numberOfRows; y++) {
            for (let x = 0; x < numberOfColumns; x++) {
                currentCalculationArea[y][x] = currentGravityCalculationArea[y][x];
            }
        }
    }


    // this function draws the currentGravityCalculationField with falling blocks

    function drawPlayAreaWithFallingBlocks() {

        // clear the canvas
        const c = document.getElementById("playAreaCanvas");
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);

        // go thru the blocks one by one in listOfBlocksInThePlayingArea
        let yModifierInPixels;
        for (let i = 0; i < listOfBlocksInThePlayingArea.length; i++) {

            const xModifierInSquares = listOfBlocksInThePlayingArea[i].blockX;
            const yModifierInSquares = listOfBlocksInThePlayingArea[i].blockY + 1;
            const drawEmptyLines = true;
            const blockMapToDraw = listOfBlocksInThePlayingArea[i].blockMap;
            const blockToDrawColor = colorRelated.getBlockColor(listOfBlocksInThePlayingArea[i].blockIndex);
            if (playerLevelEnvironment.listOfBlocksThatCanBeMoved.includes(i)) {
                yModifierInPixels = gravityAnimationYModifier;
            } else {
                yModifierInPixels = 0;
            }
            drawBlock.drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifierInSquares, yModifierInSquares, yModifierInPixels, drawEmptyLines, playerLevelEnvironment.playAreaMode, playerLevelEnvironment.fullLines, playerLevelEnvironment.gameEndFadeAnimationCounter, gameLevelEnvironment.gameEndFadeAnimationLength, playerLevelEnvironment.fullLineFadeAnimationCounter, gameLevelEnvironment.fullLineFadeAnimationLength);
        }
    }


    // this function does the "blockFallingAnimation" routine

    function blockFallingRoutine() {

        // check if we have full lines, if we have them, remove them
        checkFullLineInCurrentCalculationArea();

        // if we need to set a new block, save the old one and set a new one
        if (playerLevelEnvironment.selectANewBlockNextFrame === true) {

            // save old one
            saveDoneBlock();

            // select a new one
            selectANewBlock();
            playerLevelEnvironment.selectANewBlockNextFrame = false;
        }

        // let's move the current block down

        // y previously in the calculationArea
        let previousYCalculationArea = Math.floor(yPlayArea / gameLevelEnvironment.pixelSize);
        // y in the playArea
        yPlayArea = yPlayArea + playerLevelEnvironment.fallingSpeed;
        // y now in the calculationArea
        let currentYCalculationArea = Math.floor(yPlayArea / gameLevelEnvironment.pixelSize);
        // do we need to move down the block in the calculationArea
        if (previousYCalculationArea !== currentYCalculationArea) {
            // yes, try to do the move in calculationArea
            moveBlockInCalculationArea('moveDown');
        } else {
            // no, just recalculate calculationArea
            moveBlockInCalculationArea('');
        }

        // if the current block will be replaced next frame, don't draw the playArea
        if (playerLevelEnvironment.selectANewBlockNextFrame === false) {
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
        if (animateFullLines() === true) {
            hideFullLines(playerLevelEnvironment.fullLines);

            // check if any block can fall down
            const isThereABlockThatCanBeMoved = checkIfAnyBlockCanFallDown();
            if (isThereABlockThatCanBeMoved === true) {
                playerLevelEnvironment.playAreaMode = 'gravityAnimation';
            } else {
                playerLevelEnvironment.playAreaMode = 'blockFallingAnimation';
            }
        }
    }


    // this function does the "gravityAnimation" routine

    function gravityAnimationRoutine() {

        gravityAnimationYModifier = gravityAnimationYModifier + gameLevelEnvironment.gravityAnimationFallingSpeed;
        if (gravityAnimationYModifier < gameLevelEnvironment.pixelSize) {
            drawPlayAreaWithFallingBlocks();
        } else {
            for (let i = 0; i < playerLevelEnvironment.listOfBlocksThatCanBeMoved.length; i++) {
                listOfBlocksInThePlayingArea[playerLevelEnvironment.listOfBlocksThatCanBeMoved[i]].blockY++;
            }
            calculateCurrentGravityCalculationArea();
            copyCurrentGravityCalculationAreaToCurrentCalculationArea();

            gravityAnimationYModifier = 0;

            const isThereABlockThatCanBeMoved = checkIfAnyBlockCanFallDown();
            if (isThereABlockThatCanBeMoved === true) {
                playerLevelEnvironment.playAreaMode = 'gravityAnimation';
            } else {
                playerLevelEnvironment.playAreaMode = 'blockFallingAnimation';
            }

        }

    }


    // this function does the "gameEndAnimation" routine

    function gameEndAnimationRoutine() {

        // no more moves
        document.onkeydown = null;

        // draw the play area
        drawPlayArea();

        // increase opacity
        playerLevelEnvironment.gameEndFadeAnimationCounter--;

        // check if everything has faded out properly
        if (playerLevelEnvironment.gameEndFadeAnimationCounter === 0) {

            playerLevelEnvironment.gameEndFadeAnimationCounter = gameLevelEnvironment.gameEndFadeAnimationLength;

            statRelated.displayGameEndStats(playerLevelEnvironment.blockCounter);

            $('#gamestartbutton').css('visibility','visible');

            // stop the game loop
            gameLevelEnvironment.stopTheGameLoop = true;


        } else {
            //
        }

    }


    // this is the game loop, it runs every frame

    function gameLoop() {

        switch (playerLevelEnvironment.playAreaMode) {
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

        // increase playerLevelEnvironment.frameNumber
        playerLevelEnvironment.frameNumber++;

        // let's restart the game loop in the next frame
        if (!gameLevelEnvironment.stopTheGameLoop) {
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

// set playerLevelEnvironment.playAreaMode
playerLevelEnvironment.playAreaMode = 'blockFallingAnimation';

// record game start time
statRelated.setGameStartTime();

// start the gameloop
requestAnimationFrame(gameLoop);