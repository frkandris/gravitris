function getGameStartTime() {
    return new Date().getTime();
}

function getGameEndTime() {
    return new Date().getTime();
}

function getGameTimeInSeconds(gameStartTime, gameEndTime) {
    return (gameEndTime - gameStartTime) / 1000;
}

function getBlocksPerMinute(numberOfBlocks, gameTimeInSeconds) {
    return Math.round(numberOfBlocks / (gameTimeInSeconds / 60));
}

module.exports = {
    getGameStartTime,
    getGameEndTime,
    getGameTimeInSeconds,
    getBlocksPerMinute
}