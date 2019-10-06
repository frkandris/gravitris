const playerLevelEnvironment = require('./playerLevelEnvironment');

// this function adds commas to a number at every thousand

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


// this function announces, that the game has started

function sayGameStarted() {
    saySomething("<span class=text-light>Game started!</span>");
}


// this function announces, that the game has ended,
// and displays the restart / home buttons

function sayGameOver() {
    saySomething("<br/><span class=text-light>Game over!</span>");

    const restartButton = '<br/><button type="button" class="btn btn-primary" onClick="window.location.reload();">Start a new game</button>';
    const separator = "&nbsp;"
    const returnToMainScreenButton = '<a href="/"><button type="button" class="btn btn-primary">Return to main menu</button></a>';
    saySomething(restartButton + separator + returnToMainScreenButton);
}


// this function announces that the game level and speed has been increased

function sayLevelIncreased(gameLevel) {
    saySomething("<span class=text-light>Level#" + gameLevel + "</span> reached, speed increased!");
}


// this function announces that there were points received

function sayPointsReceived(pointsReceived, numberOfNewLinesCleared) {
    if (numberOfNewLinesCleared == 1) {
        saySomething("<span class=text-light>+" + numberWithCommas(pointsReceived) + " points</span> (1 line cleared on level#" + playerLevelEnvironment.gameLevel+ ", " + numberWithCommas(playerLevelEnvironment.points) + " points overall)");
    } else {
        saySomething("<span class=text-light>+" + numberWithCommas(pointsReceived) + " points</span> (" + numberOfNewLinesCleared + " lines cleared on level#" + playerLevelEnvironment.gameLevel+ ", " + numberWithCommas(playerLevelEnvironment.points) + " points overall)");
    }
}


// this function displays the game end stats

function sayGameEndStats(numberOfLinesCleared, gameTimeInSeconds, numberOfBlocks, blocksPerMinute) {
    saySomething("<br/><span class=text-light>Game end stats:</span>");
    if (numberOfLinesCleared == 1) {
        saySomething("- 1 line cleared.");
    } else {
        saySomething("- <span class=text-light>" + numberOfLinesCleared + " lines</span> cleared.");
    }
    saySomething("- <span class=text-light>" + Math.round(gameTimeInSeconds) + " seconds</span> game time.");
    saySomething("- <span class=text-light>" + numberOfBlocks + " blocks</span> served.");
    saySomething("- <span class=text-light>" + blocksPerMinute + " blocks/minute</span> player speed.");
    saySomething("- <span class=text-light>" + numberWithCommas(playerLevelEnvironment.points) + " points</span>.");
    saySomething("- <span class=text-light>Level#" + playerLevelEnvironment.gameLevel + "</span>.")
}


// this function extends the chat-area div with the texts

function saySomething(something) {
    const theDiv = document.getElementById("chat-area");
    theDiv.innerHTML += something + "<br/>";
}


module.exports = {
    sayGameStarted,
    sayGameOver,
    sayLevelIncreased,
    sayPointsReceived,
    sayGameEndStats
};