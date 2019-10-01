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
}

function displayGameEndStats(blockCounter) {
    const c = document.getElementById("playAreaCanvas");
    const ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "14px Consolas";

    ctx.fillText("Lines cleared: " + numberOfLinesCleared, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

    const gameTimeInSeconds = getGameTimeInSeconds(gameStartTime, gameEndTime);
    ctx.fillText("Game time: " + gameTimeInSeconds, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

    ctx.fillText("Number of blocks: " + blockCounter, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

    const blocksPerMinute = getBlocksPerMinute(blockCounter, gameTimeInSeconds);
    ctx.fillText("BPM: " + blocksPerMinute, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

}

module.exports = {
    setGameStartTime,
    setGameEndTime,
    increaseNumberOfLinesCleared,
    displayGameEndStats
};