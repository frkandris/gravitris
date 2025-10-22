const pixelSize = 20;

const gameWidth = 10; // how many columns do we have
const playAreaWidth = gameWidth * pixelSize;

const fullLineFadeAnimationLength = 10;
const gravityAnimationFallingSpeed = 4;
const gameEndFadeAnimationLength = 100;

const numberOfLinesNeedsToBeClearedToIncreaseGameSpeed = 3;

let stopTheGameLoop = false;

const numberOfBlocksInAllBlocks = 100; // this is the number of blocks we'll generate in the beginning of the game
let allBlocks = []; // we store all blocks generated in the beginning of the game here

const numberOfBlocksDisplayedInTheNextBlocksArea = 3; // number Of Blocks Displayed In The Next Blocks Area

module.exports = {
    pixelSize,
    playAreaWidth,
    fullLineFadeAnimationLength,
    gravityAnimationFallingSpeed,
    gameEndFadeAnimationLength,
    numberOfLinesNeedsToBeClearedToIncreaseGameSpeed,
    stopTheGameLoop,
    numberOfBlocksInAllBlocks,
    allBlocks,
    numberOfBlocksDisplayedInTheNextBlocksArea
};