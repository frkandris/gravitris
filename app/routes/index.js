const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Counter = require('../models/Counter.model');
const gameRecording = require('../models/GameRecording.model');
const nconf = require('nconf');

const dbURL = nconf.get('database:MONGODB_URL');
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { /** ready to use */ },
    err => { console.log(err); /** handle initial connection error */ }
);


/* GET welcome page. */
router.get('/', function(req, res) {

  Promise.all([
    Counter.find({ counterName: 'linesCleared' }),
    Counter.find({ counterName: 'gamesPlayed'})
  ]).then( ([ linesCleared, gamesPlayed ]) => {
    let numberOfGamesPlayed;
    let numberOfLinesCleared;
    if (linesCleared[0]) {
      numberOfLinesCleared = linesCleared[0].counterValue;
    } else {
      numberOfLinesCleared = 1;
    }
    if (gamesPlayed[0]) {
      numberOfGamesPlayed = gamesPlayed[0].counterValue;
    } else {
      numberOfGamesPlayed = 1;
    }
    res.render('index', { 
      numberOfLinesCleared: numberOfLinesCleared,
      numberOfGamesPlayed: numberOfGamesPlayed,
      app_version: process.env.npm_package_version
    });
  });

});


/* GET game page. */
router.get('/game', function(req, res) {

  // increase gamesPlayed
  Counter.findOneAndUpdate(
    {
      counterName: 'gamesPlayed'
    }, 
    { 
      $inc: { 
        counterValue: 1
      } 
    }, 
    { 
      upsert: true,
      new: true
    },
    function(err, counter) {
    if (err) {
      console.log('game | error | could not increase gamesPlayed counter', counter);
    } else {
      // success
    }
  });

  res.render('game');
});


/* Increase the linesCleared counter */
router.get('/increase-linesCleared-counter/:numberOfLinesCleared', function(req, res) {
  const numberOfLinesCleared = Number(req.params.numberOfLinesCleared);
  if (typeof numberOfLinesCleared != "number") {
    console.log('increase-linesCleared-counter | error | not a number received from the client');
  } else if (numberOfLinesCleared > 30) {
    console.log('increase-linesCleared-counter | error | number is greater than 30 received from the client');
  } else {
    Counter.findOneAndUpdate(
      {
        counterName: 'linesCleared'
      }, 
      { 
        $inc: { 
          counterValue: numberOfLinesCleared
        } 
      }, 
      { 
        upsert: true,
        new: true
      },
      function(err, counter) {
      if (err) {
        console.log('increase-linesCleared-counter | error | could not increase the counter', counter);
        res.status(400).send('error increasing counter', err);
      } else {
        console.log('increase-linesCleared-counter | log | counter increased by ' + numberOfLinesCleared);
        res.sendStatus(200);
      }
    });
  }
});


/* Save a gameString to the DB based on client request  */
router.post('/save-game-status/', function(req, res) {

  let newGameRecording = new gameRecording();
  newGameRecording.gameString = req.body.gameString;

  // console.log(req.body.gameString);

  newGameRecording.save(function(err, gameRecording) {
    if (err) {
      console.log("problem", err);
      res.sendStatus(400);
    } else {
      console.log("success", gameRecording);
      res.sendStatus(200);
    }
  })
});


module.exports = router;
