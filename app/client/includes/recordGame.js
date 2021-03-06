const playerLevelEnvironment = require('./playerLevelEnvironment');
const gameLevelEnvironment = require('./gameLevelEnvironment');
const axios = require('axios');


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
    axios.post('/save-game-status/', params)
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

module.exports = {
    saveGameEvent,
    saveGameToServer
};