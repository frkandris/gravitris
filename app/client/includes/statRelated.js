const chat = require('./chat');
const axios = require('axios');

let gameEndTime;
let gameStartTime;

let numberOfLinesCleared = 0;

let statLineCounter = 0;
const statPositionX = 5;
const statPositionY = 150;
const lineHeight = 20;

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
    axios.get('/increase-linesCleared-counter/' + numberOfNewLinesCleared)
    .then(function (response) {
      // handle success
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

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