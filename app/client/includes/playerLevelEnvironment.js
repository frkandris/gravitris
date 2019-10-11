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

let gameLevel = 1; // level reached in the game, determines game speed
let points = 0; // points reached in the game

let playerName = localStorage.getItem("playerName");
// if there was no nickName, generate one
if (playerName === '') {
    const animals = ['Alligator', 'Ant', 'Bear', 'Bee', 'Bird', 'Camel', 'Cat', 'Cheetah', 'Chicken', 'Chimpanzee', 'Cow', 'Crocodile', 'Deer', 'Dog', 'Dolphin', 'Duck', 'Eagle', 'Elephant', 'Fish', 'Fly', 'Fox', 'Frog', 'Giraffe', 'Goat', 'Goldfish', 'Hamster', 'Hippopotamus', 'Horse', 'Kangaroo', 'Kitten', 'Lion', 'Lobster', 'Monkey', 'Octopus', 'Owl', 'Panda', 'Pig', 'Puppy', 'Rabbit', 'Rat', 'Scorpion', 'Seal', 'Shark', 'Sheep', 'Snail', 'Snake', 'Spider', 'Squirrel', 'Tiger', 'Turtle', 'Wolf', 'Zebra'];
    playerName = 'Anonymous ' + animals[Math.floor(Math.random() * animals.length)];
}

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
    rotationIndex,
    gameLevel,
    points,
    playerName
};