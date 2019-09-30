const gameLevelEnvironment = require('./gameLevelEnvironment');

let fallingSpeed = 1;
let selectANewBlockNextFrame = true;

let fullLineFadeAnimationCounter = gameLevelEnvironment.fullLineFadeAnimationLength;
let gameEndFadeAnimationCounter = gameLevelEnvironment.gameEndFadeAnimationLength;

let moveCanBeDone = true;

module.exports = {
    fallingSpeed,
    selectANewBlockNextFrame,
    fullLineFadeAnimationCounter,
    gameEndFadeAnimationCounter,
    moveCanBeDone
    // stopTheGameLoop,
    // blockCounter,
    // frameNumber,
    // playAreaMode,
    // fullLines,
    // listOfBlocksThatCanBeMoved,
    // gravityAnimationYModifier,
    // nextBlocks,
    // listOfBlocksInThePlayingArea,
    // logOfEvents
};