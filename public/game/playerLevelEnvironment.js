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

// Helper function to generate random name
function generateRandomName() {
    const adjectives = [
        'Swift', 'Mighty', 'Clever', 'Brave', 'Epic', 'Cosmic', 'Stellar', 'Quantum',
        'Blazing', 'Thunder', 'Frost', 'Shadow', 'Golden', 'Crystal', 'Neon', 'Turbo',
        'Electric', 'Mystic', 'Hyper', 'Ultra', 'Super', 'Mega', 'Ninja', 'Cyber',
        'Atomic', 'Laser', 'Plasma', 'Diamond', 'Phoenix', 'Dragon', 'Vortex', 'Storm'
    ];
    const nouns = [
        'Fox', 'Wolf', 'Eagle', 'Falcon', 'Hawk', 'Tiger', 'Lion', 'Panda',
        'Bear', 'Shark', 'Dragon', 'Phoenix', 'Cobra', 'Panther', 'Raven', 'Lynx',
        'Otter', 'Badger', 'Owl', 'Penguin', 'Puma', 'Leopard', 'Cheetah', 'Raptor',
        'Viper', 'Manta', 'Jaguar', 'Orca', 'Dolphin', 'Octopus', 'Kraken', 'Yeti'
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
}

let playerName = localStorage.getItem("playerName");
// If there was no name or it's empty/null, generate one
if (!playerName || playerName.trim() === '') {
    playerName = generateRandomName();
    localStorage.setItem("playerName", playerName);
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