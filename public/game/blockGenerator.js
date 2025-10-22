const playerLevelEnvironment = require('./playerLevelEnvironment');
const gameLevelEnvironment = require('./gameLevelEnvironment');
const statRelated = require('./statRelated');
const blockMap = require('./blockMap');
const calculationAreaDefinitions = require('./calculationAreaDefinitions');


// this function returns the index of a randomly selected block

function selectABlockRandomly() {
    let numberOfBlocks = Object.keys(blockMap).length;
    return Math.floor(Math.random() * numberOfBlocks);
}


// this function sets the next new block
// (gets the new one from the playerLevelEnvironment.nextBlocks,
// adds a new random block to playerLevelEnvironment.nextBlocks,
// sets coordinates of the new block)

function selectANewBlock(){

    // get a random new block
    // const newBlock = selectABlockRandomly();
    const allBlocksPointer = (playerLevelEnvironment.blockCounter + 1) % gameLevelEnvironment.numberOfBlocksInAllBlocks;
    const currentBlock = gameLevelEnvironment.allBlocks[allBlocksPointer];

    // add new item to the beginning of the array
    // playerLevelEnvironment.nextBlocks.unshift(newBlock);

    // let currentBlock = playerLevelEnvironment.nextBlocks.slice(-1).pop(); // get the last item
    // playerLevelEnvironment.nextBlocks.splice(-1,1); // remove the last item

    // set the current block
    playerLevelEnvironment.blockIndex = currentBlock;
    playerLevelEnvironment.rotationIndex = 0;
    playerLevelEnvironment.xPlayArea = (gameLevelEnvironment.playAreaWidth / 2) - (2 * gameLevelEnvironment.pixelSize);
    playerLevelEnvironment.yPlayArea = 0;

    playerLevelEnvironment.moveCanBeDone = checkIfBlockOverlapsAnythingOnACalculationArea();
    if (playerLevelEnvironment.moveCanBeDone === false) {
        playerLevelEnvironment.playAreaMode = 'gameEndFadeOutAnimation';
        statRelated.setGameEndTime();
    }

    playerLevelEnvironment.blockCounter++;
}


// this function checks if a block overlaps anything on a calculation area

function checkIfBlockOverlapsAnythingOnACalculationArea() {

    let moveCanBeDone = true;

    const blockMapNumberOfRows = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex]).length;
    const blockMapNumberOfColumns = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][0]).length;

    let isRectangleFilled;
    for (let y = 0; y < blockMapNumberOfRows; y++) {
        for (let x = 0; x < blockMapNumberOfColumns; x++) {
            isRectangleFilled = blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][y][x];
            if (isRectangleFilled === 1) {
                const yOnCalculationArea = Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize) + y;
                const xOnCalculationArea = Math.floor(playerLevelEnvironment.xPlayArea / gameLevelEnvironment.pixelSize) + x;
                if (calculationAreaDefinitions.currentCalculationArea[yOnCalculationArea][xOnCalculationArea] !== 0) {
                    // move can not be done, as the block in the new position would overlap with something
                    moveCanBeDone = false;
                }
            }
        }
    }

    return moveCanBeDone;
}


// this function generates all blocks that we'll use during the game

function generateAllBlocks() {
    for (let i = 0; i < gameLevelEnvironment.numberOfBlocksInAllBlocks; i++) {
        let nextPiece = selectABlockRandomly();
        gameLevelEnvironment.allBlocks.push(nextPiece);
    }
}

module.exports = {
    selectANewBlock,
    selectABlockRandomly,
    generateAllBlocks
};