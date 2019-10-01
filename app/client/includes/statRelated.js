var axios = require('axios');

var gameEndTime;
var gameStartTime;

var numberOfLinesCleared = 0;

var statLineCounter = 0;
var statPositionX = 5;
var statPositionY = 150;
var lineHeight = 20;

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
    var c = document.getElementById("playAreaCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "14px Consolas";

    ctx.fillText("Lines cleared: " + numberOfLinesCleared, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

    var gameTimeInSeconds = getGameTimeInSeconds(gameStartTime, gameEndTime);
    ctx.fillText("Game time: " + gameTimeInSeconds, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

    ctx.fillText("Number of blocks: " + blockCounter, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

    var blocksPerMinute = getBlocksPerMinute(blockCounter, gameTimeInSeconds);
    ctx.fillText("BPM: " + blocksPerMinute, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

}

module.exports = {
    setGameStartTime,
    setGameEndTime,
    increaseNumberOfLinesCleared,
    displayGameEndStats
}