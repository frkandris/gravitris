const gameLevelEnvironment = require('./gameLevelEnvironment');

let fallingSpeed = 1;
let selectANewBlockNextFrame = true;

let fullLineFadeAnimationCounter = gameLevelEnvironment.fullLineFadeAnimationLength;
let gameEndFadeAnimationCounter = gameLevelEnvironment.gameEndFadeAnimationLength;

let moveCanBeDone = true;

let blockCounter = 0;
let frameNumber = 0;

let playAreaMode = '';

let fullLines = [];

let listOfBlocksThatCanBeMoved = [];

let gravityAnimationYModifier = 0;

let nextBlocks = [];

let listOfBlocksInThePlayingArea = [];

let logOfEvents = [];

let yPlayArea;
let xPlayArea;
let blockIndex;
let rotationIndex;

module.exports = {
    fallingSpeed,
    selectANewBlockNextFrame,
    fullLineFadeAnimationCounter,
    gameEndFadeAnimationCounter,
    moveCanBeDone,
    blockCounter,
    frameNumber,
    playAreaMode,
    fullLines,
    listOfBlocksThatCanBeMoved,
    gravityAnimationYModifier,
    nextBlocks,
    listOfBlocksInThePlayingArea,
    logOfEvents,
    xPlayArea,
    yPlayArea,
    blockIndex,
    rotationIndex
};