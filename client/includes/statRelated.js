var gameEndTime;
var gameStartTime;

var numberOfLinesCleared = 0;

var statLineCounter = 0;
var statPositionX = 50;
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

function increaseNumberOfLinesCreated(numberOfNewLinesCleared) {
    numberOfLinesCleared += numberOfNewLinesCleared;
}

function displayGameEndStats(pieceCounter) {
    var c = document.getElementById("playAreaCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "14px Consolas";

    ctx.fillText("Number of lines cleared: " + numberOfLinesCleared, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

    var gameTimeInSeconds = getGameTimeInSeconds(gameStartTime, gameEndTime);
    ctx.fillText("Game time in seconds: " + gameTimeInSeconds, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

    ctx.fillText("Number of blocks: " + pieceCounter, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

    var blocksPerMinute = getBlocksPerMinute(pieceCounter, gameTimeInSeconds);
    ctx.fillText("BPM: " + blocksPerMinute, statPositionX, statPositionY + statLineCounter * lineHeight);
    statLineCounter++;

}

module.exports = {
    setGameStartTime,
    setGameEndTime,
    increaseNumberOfLinesCreated,
    displayGameEndStats
}