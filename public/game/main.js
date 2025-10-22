
(function() {
  'use strict';
  
  // Simple module system
  const modules = {};
  const moduleExports = {};
  
  function require(name) {
    if (moduleExports[name]) {
      return moduleExports[name];
    }
    
    if (modules[name]) {
      const module = { exports: {} };
      modules[name](module, module.exports, require);
      moduleExports[name] = module.exports;
      return module.exports;
    }
    
    throw new Error('Module not found: ' + name);
  }
  
  // Register modules
  
  modules['./includes/gameLevelEnvironment'] = function(module, exports, require) {
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
  };
  

  modules['./includes/playerLevelEnvironment'] = function(module, exports, require) {
    const gameLevelEnvironment = require('./includes/gameLevelEnvironment');

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
  };
  

  modules['./includes/blockMap'] = function(module, exports, require) {
    const blockMap = {
    0 : [
        { 
            0 : [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [1, 0, 0, 0]
            ]
        },
        { 
            1 : [
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        },
        { 
            2 : [
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        },
        { 
            3 : [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0]
            ]
        }
    ],
    1 : [
        { 
            0 : [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0]
            ]
        },
        { 
            1 : [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
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
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 1, 0]
            ]
        },
        { 
            1 : [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 0, 0]
            ]
        },
        { 
            2 : [
                [1, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        },
        { 
            3 : [
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        }
    ],
    4 : [
        { 
            0 : [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 0, 0]
            ]
        },
        { 
            1 : [
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        },
        { 
            2 : [
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        },
        { 
            3 : [
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0]
            ]
        }
    ],
    5 : [
        { 
            0 : [
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0]
            ]
        },
        {
            1 : [
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        }
    ],
    6 : [
        { 
            0 : [
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        },
        { 
            1 : [
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0]
            ]
        }
    ],
};

module.exports = blockMap;
  };
  

  modules['./includes/colorRelated'] = function(module, exports, require) {
    // block order:
//   - 1: L
//   - 2: long
//   - 3: square
//   - 4: reverse L
//   - 5: threeway
//   - 6: z
//   - 7: inverse z 

var blockColors = [
    '#8f008f', // purple
    '#008f00', // green
    '#ff531b', // orange
    '#8f8f00', // yellow
    '#00008f', // blue
    '#008b8f', // cyan
    '#8f0000'  // red
];

var shadowColor = '#2c2c2c';

// this function converts a hexadecimal color code to RGBA with opacity

function convertColorHexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}


// this function returns the color of a block from the colors[] array

function getBlockColor(colorIndex) {
    if (colorIndex == 'shadow') {
        return shadowColor;
    } else {
        var colorCalculated = colorIndex % blockColors.length;
        return blockColors[colorCalculated];
    }
}

module.exports = {
    convertColorHexToRGB,
    getBlockColor
}
  };
  

  modules['./includes/calculationAreaDefinitions'] = function(module, exports, require) {
    var currentCalculationArea = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var tempCalculationArea = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var currentGravityCalculationArea = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

module.exports = {
    currentCalculationArea,
    tempCalculationArea,
    currentGravityCalculationArea
}
  };
  

  modules['./includes/statRelated'] = function(module, exports, require) {
    const chat = require('./includes/chat');

let gameEndTime;
let gameStartTime;

let numberOfLinesCleared = 0;


function setGameStartTime() {
    gameStartTime = new Date().getTime();
}

function setGameEndTime() {
    gameEndTime = new Date().getTime();
}

function getGameTimeInSeconds(gameStartTime, gameEndTime) {
    return (gameEndTime - gameStartTime) / 1000;
}

function getBlocksPerMinute(numberOfBlocks, gameTimeInSeconds) {
    return Math.round(numberOfBlocks / (gameTimeInSeconds / 60));
}

function increaseNumberOfLinesCleared(numberOfNewLinesCleared) {
    numberOfLinesCleared += numberOfNewLinesCleared;

    // ajax load URL and increase global linesCleared counter
    fetch('/api/counters/lines-cleared/' + numberOfNewLinesCleared).catch(error => console.error('Fetch error:', error));

    return numberOfLinesCleared;
}

function displayGameEndStats(blockCounter) {

    const gameTimeInSeconds = getGameTimeInSeconds(gameStartTime, gameEndTime);
    const blocksPerMinute = getBlocksPerMinute(blockCounter, gameTimeInSeconds);

    chat.sayGameEndStats(numberOfLinesCleared, gameTimeInSeconds, blockCounter, blocksPerMinute);
}

function calculatePointsReceived(numberOfNewLinesCleared, gameLevel) {
    const pointsReceived = numberOfNewLinesCleared * gameLevel * 100;
    return pointsReceived;
}

module.exports = {
    setGameStartTime,
    setGameEndTime,
    increaseNumberOfLinesCleared,
    displayGameEndStats,
    calculatePointsReceived
};
  };
  

  modules['./includes/drawBlock'] = function(module, exports, require) {
    const colorRelated = require('./includes/colorRelated');
const gameLevelEnvironment = require('./includes/gameLevelEnvironment');

// this function draws a block to a canvas

function drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifierInSquares, yModifierInSquares, yModifierInPixels, drawEmptyLines, playAreaMode, fullLines, gameEndFadeAnimationCounter, gameEndFadeAnimationLength, fullLineFadeAnimationCounter, fullLineFadeAnimationLength) {

    let opacity;
    const blockMapNumberOfRows = blockMapToDraw.length;
    const blockMapNumberOfColumns = blockMapToDraw[0].length;
    let lineIsEmpty = true;
    let isRectangleFilled;

    for (let y = 0; y < blockMapNumberOfRows; y++) {
        for (let x = 0; x < blockMapNumberOfColumns; x++) {
            isRectangleFilled = blockMapToDraw[y][x];
            if (isRectangleFilled === 1) {

                lineIsEmpty = false;

                // determine position

                const xOnCalculationArea = x + xModifierInSquares;
                const yOnCalculationArea = y + yModifierInSquares;

                // determine the color of the pixel

                if (playAreaMode === 'gameEndFadeOutAnimation') {
                    opacity = gameEndFadeAnimationCounter / gameEndFadeAnimationLength;
                } else if (fullLines.includes(yOnCalculationArea - 1)) {
                    opacity = fullLineFadeAnimationCounter / fullLineFadeAnimationLength;
                } else {
                    opacity = 1;
                }
                ctx.fillStyle = colorRelated.convertColorHexToRGB(blockToDrawColor, opacity);

                // draw the block
                ctx.fillRect(xOnCalculationArea * gameLevelEnvironment.pixelSize, yOnCalculationArea * gameLevelEnvironment.pixelSize + yModifierInPixels, (gameLevelEnvironment.pixelSize - 1), (gameLevelEnvironment.pixelSize - 1));

                let isBottomSiblingFilled;
                let isRightSiblingFilled;
                let isBottomRightSiblingFilled;

                // check if the block has another pixel on the right this one
                try {
                    isRightSiblingFilled = blockMapToDraw[y][x + 1];
                    if (isRightSiblingFilled === 1) {
                        ctx.fillRect(xOnCalculationArea * gameLevelEnvironment.pixelSize + gameLevelEnvironment.pixelSize - 1, yOnCalculationArea * gameLevelEnvironment.pixelSize + yModifierInPixels, 1, (gameLevelEnvironment.pixelSize - 1));
                    }
                } catch {
                    //
                }

                // check if the block has another pixel underneath this one
                try {
                    isBottomSiblingFilled = blockMapToDraw[y + 1][x];
                    if (isBottomSiblingFilled === 1) {
                        ctx.fillRect(xOnCalculationArea * gameLevelEnvironment.pixelSize, yOnCalculationArea * gameLevelEnvironment.pixelSize + yModifierInPixels + gameLevelEnvironment.pixelSize - 1, (gameLevelEnvironment.pixelSize - 1), 1);
                    }
                } catch {
                    //
                }

                // check if the block has another pixel underneath and right from this one
                try {
                    isBottomRightSiblingFilled = blockMapToDraw[y + 1][x + 1];
                    if ((isBottomRightSiblingFilled === 1) && (isBottomSiblingFilled === 1) && (isRightSiblingFilled === 1)) {
                        ctx.fillRect(xOnCalculationArea * gameLevelEnvironment.pixelSize + gameLevelEnvironment.pixelSize - 1, yOnCalculationArea * gameLevelEnvironment.pixelSize + yModifierInPixels + gameLevelEnvironment.pixelSize - 1, 1, 1);
                    }
                } catch {
                    //
                }

            }
        }
        if ((drawEmptyLines === false) && (lineIsEmpty === true)) {
            yModifierInSquares--;
        }
    }
}

module.exports = {
    drawBlock
};
  };
  

  modules['./includes/chat'] = function(module, exports, require) {
    const playerLevelEnvironment = require('./includes/playerLevelEnvironment');

const gameStartText = "<span class=text-light>Game started! Good luck " + playerLevelEnvironment.playerName + "!</span>";
const replayStartText = "<span class=text-light>Replay started!</span>";
const gameOverText = "<span class=text-light>Game over!</span>";
const replayOverText = "<span class=text-light>Replay over!</span>";
const newGameButton = '<a href="/game"><button type="button" class="btn btn-primary">New game</button></a>';
const restartReplayButton = '<button type="button" class="btn btn-primary" onclick="location.reload();">Replay</button></a>';
const goToLeaderBoardButton = '<a href="/leaderboard"><button type="button" class="btn btn-primary">Leaderboard</button></a>';
const separator = "&nbsp;";
const newLine = "<br/>";

// this function adds commas to a number at every thousand

function numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


// this function announces, that the game has started

function sayGameStarted() {
    saySomething(gameStartText);
}


// this function announces, that a replay has started

function sayReplayStarted() {
    saySomething(replayStartText);
}


// this function announces, that the game has ended,
// and displays the restart / home buttons

function sayGameOver() {
    saySomething(newLine + gameOverText);
    saySomething(newLine + newGameButton + separator + goToLeaderBoardButton);
}


// this function announces, that the replay has ended,
// and displays the restart / home buttons

function sayReplayOver() {
    saySomething(newLine + replayOverText);
    saySomething(newLine + restartReplayButton + separator + newGameButton + separator + goToLeaderBoardButton);
}


// this function announces that the game level and speed has been increased

function sayLevelIncreased(gameLevel) {
    saySomething("<span class=text-light>Level#" + gameLevel + "</span> reached, speed increased!");
}


// this function announces that there were points received

function sayPointsReceived(pointsReceived, numberOfNewLinesCleared) {
    if (numberOfNewLinesCleared === 1) {
        saySomething("<span class=text-light>+" + numberWithCommas(pointsReceived) + " points</span> (1 line cleared on level#" + playerLevelEnvironment.gameLevel + ", " + numberWithCommas(playerLevelEnvironment.points) + " points overall)");
    } else {
        saySomething("<span class=text-light>+" + numberWithCommas(pointsReceived) + " points</span> (" + numberOfNewLinesCleared + " lines cleared on level#" + playerLevelEnvironment.gameLevel + ", " + numberWithCommas(playerLevelEnvironment.points) + " points overall)");
    }
}


// this function displays the game end stats

function sayGameEndStats(numberOfLinesCleared, gameTimeInSeconds, numberOfBlocks, blocksPerMinute) {
    saySomething("<br/><span class=text-light>Game end stats:</span>");
    if (numberOfLinesCleared === 1) {
        saySomething("- <span class=text-light>1 line</span> cleared.");
    } else {
        saySomething("- <span class=text-light>" + numberOfLinesCleared + " lines</span> cleared.");
    }
    saySomething("- <span class=text-light>" + Math.round(gameTimeInSeconds) + " seconds</span> game time.");
    saySomething("- <span class=text-light>" + numberOfBlocks + " blocks</span> served.");
    saySomething("- <span class=text-light>" + blocksPerMinute + " blocks/minute</span> player speed.");
    saySomething("- <span class=text-light>" + numberWithCommas(playerLevelEnvironment.points) + " points</span> reached.");
    saySomething("- <span class=text-light>Level#" + playerLevelEnvironment.gameLevel + "</span> reached.")
}


// this function extends the chat-area div with the texts

function saySomething(something) {
    const theDiv = document.getElementById("chat-area");
    theDiv.innerHTML += something + "<br/>";
}


module.exports = {
    sayGameStarted,
    sayReplayStarted,
    sayGameOver,
    sayReplayOver,
    sayLevelIncreased,
    sayPointsReceived,
    sayGameEndStats
};
  };
  

  modules['./includes/recordGame'] = function(module, exports, require) {
    const playerLevelEnvironment = require('./includes/playerLevelEnvironment');
const gameLevelEnvironment = require('./includes/gameLevelEnvironment');


function saveGameEvent(frameNumber, eventName, eventValue) {
    playerLevelEnvironment.logOfEvents.push({
        frameNumber: frameNumber,
        eventName: eventName,
        eventValue: eventValue
    });
    // console.log(frameNumber, eventName, eventValue)
}

function saveGameToServer() {

    const params = {
        gameBlocks: gameLevelEnvironment.allBlocks,
        gameString: playerLevelEnvironment.logOfEvents,
        playerName: playerLevelEnvironment.playerName,
        gameLevel: playerLevelEnvironment.gameLevel,
        points: playerLevelEnvironment.points
    };

    // ajax load URL and increase global linesCleared counter
    fetch('/api/game/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(params) }).catch(error => console.error('Fetch error:', error));

}

module.exports = {
    saveGameEvent,
    saveGameToServer
};
  };
  

  modules['./includes/blockGenerator'] = function(module, exports, require) {
    const playerLevelEnvironment = require('./includes/playerLevelEnvironment');
const gameLevelEnvironment = require('./includes/gameLevelEnvironment');
const statRelated = require('./includes/statRelated');
const blockMap = require('./includes/blockMap');
const calculationAreaDefinitions = require('./includes/calculationAreaDefinitions');


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
  };
  
  
  // Main game code
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

const chat = require('./includes/chat');

const recordGame = require('./includes/recordGame');

const blockGenerator = require('./includes/blockGenerator');


    // this function gets called if there was a keyboard event

    function checkKeyboardInput(event) {

        // if there is no saved game being replayed now, handle inputs from the keyboard
        if(!replayingAGame) {
            switch (event.key) {
                case 'ArrowUp':
                    recordGame.saveGameEvent(playerLevelEnvironment.frameNumber, 'keyPressed', 'rotateRight');
                    handlePlayerInput('rotateRight');
                    break;
                case 'ArrowDown':
                    recordGame.saveGameEvent(playerLevelEnvironment.frameNumber, 'keyPressed', 'rotateLeft');
                    handlePlayerInput('rotateLeft');
                    break;
                case 'ArrowLeft':
                    recordGame.saveGameEvent(playerLevelEnvironment.frameNumber, 'keyPressed', 'moveLeft');
                    handlePlayerInput('moveLeft');
                    break;
                case 'ArrowRight':
                    recordGame.saveGameEvent(playerLevelEnvironment.frameNumber, 'keyPressed', 'moveRight');
                    handlePlayerInput('moveRight');
                    break;
                case ' ':
                    recordGame.saveGameEvent(playerLevelEnvironment.frameNumber, 'keyPressed', 'instantDrop');
                    handlePlayerInput('instantDrop');
                    break;
                default:
                    return;
            }
        }
        event.preventDefault();
    }


    // this function feeds the handlePlayerInput function with keyboard actions from the recording

    function checkPlayerInputFromRecording() {
        for (let i = 0; i < preloadedGameString.length; i++) {
            if (preloadedGameString[i].frameNumber === playerLevelEnvironment.frameNumber) {
                handlePlayerInput(preloadedGameString[i].eventValue);
            }
        }
    }

    function handlePlayerInput(event) {
        switch (event) {
            case 'rotateRight':
                moveBlockInCalculationArea('rotateRight');
                break;
            case 'rotateLeft':
                moveBlockInCalculationArea('rotateLeft');
                break;
            case 'moveLeft':
                moveBlockInCalculationArea('moveLeft');
                break;
            case 'moveRight':
                moveBlockInCalculationArea('moveRight');
                break;
            case 'instantDrop':
                // instant drop
                while (playerLevelEnvironment.moveCanBeDone === true) {
                    playerLevelEnvironment.yPlayArea = playerLevelEnvironment.yPlayArea + gameLevelEnvironment.pixelSize;
                    moveBlockInCalculationArea('moveDown');
                }
                break;
            default:
                return;
        }
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

        let numberOfRotations = Object.keys(blockMap[playerLevelEnvironment.blockIndex]).length;

        if (direction === 'moveDown') {
            // calculationArea modifications
            yCalculationAreaModifier = -1;
        }
        if (direction === 'moveLeft') {
            // calculationArea modifications
            xCalculationAreaModifier = 1;
            // playArea modifications
            playerLevelEnvironment.xPlayArea = playerLevelEnvironment.xPlayArea - gameLevelEnvironment.pixelSize;
        }
        if (direction === 'moveRight') {
            // calculationArea modifications
            xCalculationAreaModifier = -1;
            // playArea modifications
            playerLevelEnvironment.xPlayArea = playerLevelEnvironment.xPlayArea + gameLevelEnvironment.pixelSize;
        }
        if (direction === 'rotateLeft') {
            // calculationArea modifications
            playerLevelEnvironment.rotationIndex++;
            if (playerLevelEnvironment.rotationIndex === numberOfRotations) {
                playerLevelEnvironment.rotationIndex = 0;
            }
            rotationModifier = -1;
        }
        if (direction === 'rotateRight') {
            // calculationArea modifications
            playerLevelEnvironment.rotationIndex--;
            if (playerLevelEnvironment.rotationIndex < 0) {
                playerLevelEnvironment.rotationIndex = numberOfRotations - 1;
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

        playerLevelEnvironment.rotationIndex += rotationModifier;
        if (playerLevelEnvironment.rotationIndex < 0) {
            playerLevelEnvironment.rotationIndex = numberOfRotations - 1;
        }
        if (playerLevelEnvironment.rotationIndex === numberOfRotations) {
            playerLevelEnvironment.rotationIndex = 0;
        }

        let blockMapNumberOfRows = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex]).length;
        let blockMapNumberOfColumns = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][0]).length;
        for (y = 0; y < blockMapNumberOfRows; y++) {
            for (x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][y][x];
                if (isRectangleFilled === 1) {
                    yOnCalculationArea = Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize) + y + yCalculationAreaModifier;
                    xOnCalculationArea = Math.floor(playerLevelEnvironment.xPlayArea / gameLevelEnvironment.pixelSize) + x + xCalculationAreaModifier;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                }
            }
        }

        // 1.2. test if we could add the block to tempCalculationArea without overlap or any other problems

        playerLevelEnvironment.rotationIndex -= rotationModifier;
        if (playerLevelEnvironment.rotationIndex < 0) {
            playerLevelEnvironment.rotationIndex = numberOfRotations - 1;
        }
        if (playerLevelEnvironment.rotationIndex === numberOfRotations) {
            playerLevelEnvironment.rotationIndex = 0;
        }
        blockMapNumberOfRows = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex]).length;
        blockMapNumberOfColumns = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][0]).length;

        for (y = 0; y < blockMapNumberOfRows; y++) {
            for (x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][y][x];
                if (isRectangleFilled === 1) {
                    yOnCalculationArea = Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize) + y;
                    xOnCalculationArea = Math.floor(playerLevelEnvironment.xPlayArea / gameLevelEnvironment.pixelSize) + x;
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

            playerLevelEnvironment.rotationIndex += rotationModifier;
            if (playerLevelEnvironment.rotationIndex < 0) {
                playerLevelEnvironment.rotationIndex = numberOfRotations - 1;
            }
            if (playerLevelEnvironment.rotationIndex === numberOfRotations) {
                playerLevelEnvironment.rotationIndex = 0;
            }
            blockMapNumberOfRows = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex]).length;
            blockMapNumberOfColumns = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][0]).length;

            for (y = 0; y < blockMapNumberOfRows; y++) {
                for (x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][y][x];
                    if (isRectangleFilled === 1) {
                        yOnCalculationArea = Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize) + y + yCalculationAreaModifier;
                        xOnCalculationArea = Math.floor(playerLevelEnvironment.xPlayArea / gameLevelEnvironment.pixelSize) + x + xCalculationAreaModifier;
                        currentCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                    }
                }
            }

            // 1.4. add blockMap to currentCalculationArea

            playerLevelEnvironment.rotationIndex -= rotationModifier;
            if (playerLevelEnvironment.rotationIndex < 0) {
                playerLevelEnvironment.rotationIndex = numberOfRotations - 1;
            }
            if (playerLevelEnvironment.rotationIndex === numberOfRotations) {
                playerLevelEnvironment.rotationIndex = 0;
            }
            blockMapNumberOfRows = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex]).length;
            blockMapNumberOfColumns = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][0]).length;
            for (y = 0; y < blockMapNumberOfRows; y++) {
                for (x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][y][x];
                    if (isRectangleFilled === 1) {
                        yOnCalculationArea = Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize) + y;
                        xOnCalculationArea = Math.floor(playerLevelEnvironment.xPlayArea / gameLevelEnvironment.pixelSize) + x;
                        currentCalculationArea[yOnCalculationArea][xOnCalculationArea] = playerLevelEnvironment.blockIndex+1;
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
                playerLevelEnvironment.xPlayArea = playerLevelEnvironment.xPlayArea + gameLevelEnvironment.pixelSize;
            }
            if (direction === 'moveRight') {
                playerLevelEnvironment.xPlayArea = playerLevelEnvironment.xPlayArea - gameLevelEnvironment.pixelSize;
            }
            if (direction === 'rotateLeft') {
                playerLevelEnvironment.rotationIndex--;
                if (playerLevelEnvironment.rotationIndex < 0) {
                    playerLevelEnvironment.rotationIndex = numberOfRotations - 1;
                }
            }
            if (direction === 'rotateRight') {
                playerLevelEnvironment.rotationIndex++;
                if (playerLevelEnvironment.rotationIndex === numberOfRotations) {
                    playerLevelEnvironment.rotationIndex = 0;
                }
            }
        }
    }


    // this function draws the playArea, the shadow and the pixel perfect falling block

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

        const blockMapNumberOfRows = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex]).length;
        const blockMapNumberOfColumns = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][0]).length;
        let isRectangleFilled;
        for (y = 0; y < blockMapNumberOfRows; y++) {
            for (x = 0; x < blockMapNumberOfColumns; x++) {
                isRectangleFilled = blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][y][x];
                if (isRectangleFilled === 1) {
                    const yOnCalculationArea = Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize) + y;
                    const xOnCalculationArea = Math.floor(playerLevelEnvironment.xPlayArea / gameLevelEnvironment.pixelSize) + x;
                    tempCalculationArea[yOnCalculationArea][xOnCalculationArea] = 0;
                }
            }
        }

        drawAllBlocksToPlayArea(ctx);

        // draw a the shadow of the moving block

        drawShadow();

        // draw pixel perfect moving block

        const xModifierInSquares = playerLevelEnvironment.xPlayArea / gameLevelEnvironment.pixelSize;
        const yModifierInSquares = playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize;
        const yModifierInPixels = 0;
        const blockToDrawIndex = playerLevelEnvironment.blockIndex;
        const blockToDrawRotation = playerLevelEnvironment.rotationIndex;
        const drawEmptyLines = true;
        const blockMapToDraw = blockMap[blockToDrawIndex][blockToDrawRotation][blockToDrawRotation];
        const blockToDrawColor = colorRelated.getBlockColor(blockToDrawIndex);
        drawBlock.drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifierInSquares, yModifierInSquares, yModifierInPixels, drawEmptyLines, playerLevelEnvironment.playAreaMode, playerLevelEnvironment.fullLines, playerLevelEnvironment.gameEndFadeAnimationCounter, gameLevelEnvironment.gameEndFadeAnimationLength, playerLevelEnvironment.fullLineFadeAnimationCounter, gameLevelEnvironment.fullLineFadeAnimationLength);

    }


    // this function draws all blocks one by one to the playArea

    function drawAllBlocksToPlayArea(ctx) {

        // go thru the blocks one by one in playerLevelEnvironment.listOfBlocksInThePlayingArea
        for (let i = 0; i < playerLevelEnvironment.listOfBlocksInThePlayingArea.length; i++) {

            // draw the block
            const xModifierInSquares = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockX;
            const yModifierInSquares = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockY + 1;
            const yModifierInPixels = 0;
            const drawEmptyLines = true;
            const blockMapToDraw = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap;
            const blockToDrawColor = colorRelated.getBlockColor(playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockIndex);
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
            let numberOfNewLinesCleared = playerLevelEnvironment.fullLines.length;
            let numberOfLinesCleared = statRelated.increaseNumberOfLinesCleared(numberOfNewLinesCleared);
            let pointsReceived = statRelated.calculatePointsReceived(numberOfNewLinesCleared, playerLevelEnvironment.gameLevel);
            playerLevelEnvironment.points += pointsReceived;

            chat.sayPointsReceived(pointsReceived, numberOfNewLinesCleared);
            if (
                Math.round(numberOfLinesCleared / gameLevelEnvironment.numberOfLinesNeedsToBeClearedToIncreaseGameSpeed) !==
                Math.round((numberOfLinesCleared-numberOfNewLinesCleared) / gameLevelEnvironment.numberOfLinesNeedsToBeClearedToIncreaseGameSpeed)
            ) {
                playerLevelEnvironment.gameLevel++;
                playerLevelEnvironment.fallingSpeed = playerLevelEnvironment.fallingSpeed + 0.5;
                chat.sayLevelIncreased(playerLevelEnvironment.gameLevel);
            }
        }
    }


    // this function animates the full lines, until they are non-visible

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

            // modify playerLevelEnvironment.listOfBlocksInThePlayingArea because of full line
            modifyListOfBlocksInThePlayingAreaBecauseOfFullLine(fullLine);
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
            const blockMapNumberOfRows = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex]).length;
            const blockMapNumberOfColumns = Object.keys(blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][0]).length;
            for (let y = 0; y < blockMapNumberOfRows; y++) {
                for (let x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex][y][x];
                    if (isRectangleFilled === 1) {
                        const yOnCalculationArea = Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize) + y + yModifier;
                        const xOnCalculationArea = Math.floor(playerLevelEnvironment.xPlayArea / gameLevelEnvironment.pixelSize) + x;
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

        const xModifierInSquares = Math.floor(playerLevelEnvironment.xPlayArea / gameLevelEnvironment.pixelSize);
        const yModifierInSquares = Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize) + yModifier - 1;
        const yModifierInPixels = 0;
        const blockToDrawIndex = playerLevelEnvironment.blockIndex;
        const blockToDrawRotation = playerLevelEnvironment.rotationIndex;
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

        for (let i = 0; i < gameLevelEnvironment.numberOfBlocksDisplayedInTheNextBlocksArea; i++) {
            const allBlockPointer = (playerLevelEnvironment.blockCounter + i + 1) % gameLevelEnvironment.numberOfBlocksInAllBlocks;
            const blockToDrawIndex = gameLevelEnvironment.allBlocks[allBlockPointer];
            const blockToDrawRotation = 0;
            const xModifierInSquares = ((gameLevelEnvironment.numberOfBlocksDisplayedInTheNextBlocksArea - 1) * 5) - (i * 5);
            const yModifierInSquares = 0;
            const yModifierInPixels = 0;
            const drawEmptyLines = false;
            const blockMapToDraw = blockMap[blockToDrawIndex][blockToDrawRotation][blockToDrawRotation];
            const blockToDrawColor = colorRelated.getBlockColor(blockToDrawIndex);
            drawBlock.drawBlock(ctx, blockMapToDraw, blockToDrawColor, xModifierInSquares, yModifierInSquares, yModifierInPixels, drawEmptyLines, playerLevelEnvironment.playAreaMode, playerLevelEnvironment.fullLines, playerLevelEnvironment.gameEndFadeAnimationCounter, gameLevelEnvironment.gameEndFadeAnimationLength, playerLevelEnvironment.fullLineFadeAnimationCounter, gameLevelEnvironment.fullLineFadeAnimationLength);
        }
    }


    // this function saves the block that has completed its journey to playerLevelEnvironment.listOfBlocksInThePlayingArea

    function saveDoneBlock() {

        let blockAlreadyInserted = false;
        for (let i = 0; i < playerLevelEnvironment.listOfBlocksInThePlayingArea.length; i++) {
            if (playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockCounter === playerLevelEnvironment.blockCounter) {
                blockAlreadyInserted = true;
            }
        }

        if (blockAlreadyInserted === false) {
            try {
                playerLevelEnvironment.listOfBlocksInThePlayingArea.push({
                    blockMap: blockMap[playerLevelEnvironment.blockIndex][playerLevelEnvironment.rotationIndex][playerLevelEnvironment.rotationIndex],
                    blockIndex: playerLevelEnvironment.blockIndex,
                    blockX: Math.floor(playerLevelEnvironment.xPlayArea / gameLevelEnvironment.pixelSize),
                    blockY: Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize) - 1,
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

        // go thru the blocks one by one in playerLevelEnvironment.listOfBlocksInThePlayingArea
        let isRectangleFilled;
        for (let i = 0; i < playerLevelEnvironment.listOfBlocksInThePlayingArea.length; i++) {
            const blockMapNumberOfRows = Object.keys(playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap).length;
            const blockMapNumberOfColumns = Object.keys(playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap[0]).length;
            for (y = 0; y < blockMapNumberOfRows; y++) {
                for (x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap[y][x];
                    if (isRectangleFilled === 1) {
                        // copy the map of the block to currentGravityCalculationArea
                        const yOnGravityCalculationArea = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockY + y;
                        const xOnGravityCalculationArea = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockX + x;
                        let colorOnGravityCalculationArea = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockIndex + 1;
                        currentGravityCalculationArea[yOnGravityCalculationArea][xOnGravityCalculationArea] = colorOnGravityCalculationArea;
                    }
                }
            }
        }
    }


    // this function modifies blocks in the playerLevelEnvironment.listOfBlocksInThePlayingArea in case there was a full line

    function modifyListOfBlocksInThePlayingAreaBecauseOfFullLine(fullLineIndex) {

        let newBlockMap;
        let x;
        let y;

        // go thru the blocks one by one in playerLevelEnvironment.listOfBlocksInThePlayingArea
        // (we iterate backwards, so when we remove an item reindexing the array will not break the loop)
        let blockIsAffected;
        let isRectangleFilled;
        let lineAffected;
        let thereWerePixelsAboveTheCut;
        let thereWerePixelsUnderTheCut;
        for (let i = playerLevelEnvironment.listOfBlocksInThePlayingArea.length - 1; i >= 0; i--) {
            blockIsAffected = false;
            playerLevelEnvironment.listOfBlocksInThePlayingArea[i].wasChecked = true;
            const blockMapNumberOfRows = Object.keys(playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap).length;
            const blockMapNumberOfColumns = Object.keys(playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap[0]).length;
            for (y = 0; y < blockMapNumberOfRows; y++) {
                for (x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap[y][x];
                    if (isRectangleFilled === 1) {
                        if (fullLineIndex === (playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockY + y)) {
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
                        isRectangleFilled = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap[y][x];
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
                    playerLevelEnvironment.listOfBlocksInThePlayingArea.push({
                        blockMap: newBlockMap,
                        blockIndex: playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockIndex,
                        blockX: playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockX,
                        blockY: playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockY,
                        blockCounter: playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockCounter
                    });
                    for (y = 0; y < lineAffected; y++) {
                        for (x = 0; x < blockMapNumberOfColumns; x++) {
                            playerLevelEnvironment.listOfBlocksInThePlayingArea[playerLevelEnvironment.listOfBlocksInThePlayingArea.length - 1].blockMap[y][x] = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap[y][x];
                        }
                    }
                }
                thereWerePixelsUnderTheCut = false;
                for (y = lineAffected + 1; y < blockMapNumberOfRows; y++) {
                    for (x = 0; x < blockMapNumberOfColumns; x++) {
                        isRectangleFilled = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap[y][x];
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
                    playerLevelEnvironment.listOfBlocksInThePlayingArea.push({
                        blockMap: newBlockMap,
                        blockIndex: playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockIndex,
                        blockX: playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockX,
                        blockY: playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockY + lineAffected + 1,
                        blockCounter: playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockCounter
                    });
                    for (y = lineAffected + 1; y < blockMapNumberOfRows; y++) {
                        for (x = 0; x < blockMapNumberOfColumns; x++) {
                            playerLevelEnvironment.listOfBlocksInThePlayingArea[playerLevelEnvironment.listOfBlocksInThePlayingArea.length - 1].blockMap[y - (lineAffected + 1)][x] = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap[y][x];
                        }
                    }
                }
                // remove the old item from the list
                playerLevelEnvironment.listOfBlocksInThePlayingArea.splice(i, 1);
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

        // let's iterate thru all the blocks we have in playerLevelEnvironment.listOfBlocksInThePlayingArea
        let isRectangleFilled;
        for (let i = 0; i < playerLevelEnvironment.listOfBlocksInThePlayingArea.length; i++) {

            // clear currentGravityCalculationArea
            let numberOfRows = currentGravityCalculationArea.length;
            let numberOfColumns = currentGravityCalculationArea[0].length;
            for (y = 0; y < numberOfRows; y++) {
                for (x = 0; x < numberOfColumns; x++) {
                    currentGravityCalculationArea[y][x] = 0;
                }
            }

            // calculate currentGravityCalculationArea, without the current block

            // go thru the blocks one by one in playerLevelEnvironment.listOfBlocksInThePlayingArea
            // draw every block except the one we calculate now
            for (let k = 0; k < playerLevelEnvironment.listOfBlocksInThePlayingArea.length; k++) {
                if (k !== i) {
                    blockMapNumberOfRows = Object.keys(playerLevelEnvironment.listOfBlocksInThePlayingArea[k].blockMap).length;
                    blockMapNumberOfColumns = Object.keys(playerLevelEnvironment.listOfBlocksInThePlayingArea[k].blockMap[0]).length;
                    for (y = 0; y < blockMapNumberOfRows; y++) {
                        for (x = 0; x < blockMapNumberOfColumns; x++) {
                            isRectangleFilled = playerLevelEnvironment.listOfBlocksInThePlayingArea[k].blockMap[y][x];
                            if (isRectangleFilled === 1) {
                                const yOnGravityCalculationArea = playerLevelEnvironment.listOfBlocksInThePlayingArea[k].blockY + y;
                                const xOnGravityCalculationArea = playerLevelEnvironment.listOfBlocksInThePlayingArea[k].blockX + x;
                                const colorOnGravityCalculationArea = playerLevelEnvironment.listOfBlocksInThePlayingArea[k].blockIndex + 1;
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
            blockMapNumberOfRows = Object.keys(playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap).length;
            blockMapNumberOfColumns = Object.keys(playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap[0]).length;

            for (y = 0; y < blockMapNumberOfRows; y++) {
                for (x = 0; x < blockMapNumberOfColumns; x++) {
                    isRectangleFilled = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap[y][x];
                    if (isRectangleFilled === 1) {
                        const yOnCalculationArea = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockY + y + yModifier + 1;
                        const xOnCalculationArea = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockX + x;
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

        // go thru the blocks one by one in playerLevelEnvironment.listOfBlocksInThePlayingArea
        let yModifierInPixels;
        for (let i = 0; i < playerLevelEnvironment.listOfBlocksInThePlayingArea.length; i++) {

            const xModifierInSquares = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockX;
            const yModifierInSquares = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockY + 1;
            const drawEmptyLines = true;
            const blockMapToDraw = playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockMap;
            const blockToDrawColor = colorRelated.getBlockColor(playerLevelEnvironment.listOfBlocksInThePlayingArea[i].blockIndex);
            if (playerLevelEnvironment.listOfBlocksThatCanBeMoved.includes(i)) {
                yModifierInPixels = playerLevelEnvironment.gravityAnimationYModifier;
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
            blockGenerator.selectANewBlock();
            playerLevelEnvironment.selectANewBlockNextFrame = false;
        }

        // let's move the current block down

        // y previously in the calculationArea
        let previousYCalculationArea = Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize);
        // y in the playArea
        playerLevelEnvironment.yPlayArea = playerLevelEnvironment.yPlayArea + playerLevelEnvironment.fallingSpeed;
        // y now in the calculationArea
        let currentYCalculationArea = Math.floor(playerLevelEnvironment.yPlayArea / gameLevelEnvironment.pixelSize);
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

        playerLevelEnvironment.gravityAnimationYModifier = playerLevelEnvironment.gravityAnimationYModifier + gameLevelEnvironment.gravityAnimationFallingSpeed;
        if (playerLevelEnvironment.gravityAnimationYModifier < gameLevelEnvironment.pixelSize) {
            drawPlayAreaWithFallingBlocks();
        } else {
            for (let i = 0; i < playerLevelEnvironment.listOfBlocksThatCanBeMoved.length; i++) {
                playerLevelEnvironment.listOfBlocksInThePlayingArea[playerLevelEnvironment.listOfBlocksThatCanBeMoved[i]].blockY++;
            }
            calculateCurrentGravityCalculationArea();
            copyCurrentGravityCalculationAreaToCurrentCalculationArea();

            playerLevelEnvironment.gravityAnimationYModifier = 0;

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

        // draw the fading play area
        drawPlayArea();

        // draw next blocks, so they fade too
        drawNextBlocksArea();

        // increase opacity
        playerLevelEnvironment.gameEndFadeAnimationCounter--;

        // check if everything has faded out properly
        if (playerLevelEnvironment.gameEndFadeAnimationCounter === 20) {

            playerLevelEnvironment.gameEndFadeAnimationCounter = gameLevelEnvironment.gameEndFadeAnimationLength;

            statRelated.displayGameEndStats(playerLevelEnvironment.blockCounter);

            // stop the game loop
            gameLevelEnvironment.stopTheGameLoop = true;

            // say "game over" in the chat
            if (!replayingAGame) {
                chat.sayGameOver();
            } else {
                chat.sayReplayOver();
            }

            // if this is not a replay
            if (!replayingAGame) {
                // save game data to the server
                recordGame.saveGameToServer();
            }

        } else {
            //
        }

    }


    // this is the game loop, it runs every frame

    function gameLoop() {

        if (replayingAGame) {
            checkPlayerInputFromRecording();
        }

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
playerLevelEnvironment.blockIndex = blockGenerator.selectABlockRandomly();
playerLevelEnvironment.nextBlocks.unshift(playerLevelEnvironment.blockIndex);
playerLevelEnvironment.blockIndex = blockGenerator.selectABlockRandomly();
playerLevelEnvironment.nextBlocks.unshift(playerLevelEnvironment.blockIndex);
playerLevelEnvironment.blockIndex = blockGenerator.selectABlockRandomly();
playerLevelEnvironment.nextBlocks.unshift(playerLevelEnvironment.blockIndex);

try {
    if(replayingAGame) {
        console.log("we are replaying a game");
    }
} catch(err) {
    replayingAGame = false;
}

// if there are preloaded blocks from the server, load them
if (replayingAGame) {
    gameLevelEnvironment.allBlocks = preloadedGameBlocks;
    // announce in the chatbox that we are replaying a saved game
    chat.sayReplayStarted();
} else {
    // ...otherwise let's create all the blocks for this game
    blockGenerator.generateAllBlocks();
    // announce in the chatbox that the game has started
    chat.sayGameStarted();
}

// set playerLevelEnvironment.playAreaMode
playerLevelEnvironment.playAreaMode = 'blockFallingAnimation';

// record game start time
statRelated.setGameStartTime();

// start the game loop
requestAnimationFrame(gameLoop);
  
})();
