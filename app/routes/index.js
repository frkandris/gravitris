var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Counter = require('../models/Counter.model');
var nconf = require('nconf');

var dbURL = nconf.get('database:MONGODB_URL');
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });


/* GET welcome page. */
router.get('/', function(req, res, next) {

  Promise.all([
    Counter.find({ counterName: 'linesCleared' }),
    Counter.find({ counterName: 'gamesPlayed'})
  ]).then( ([ linesCleared, gamesPlayed ]) => {
    if (linesCleared[0]) {
      var numberOfLinesCleared = linesCleared[0].counterValue
    } else {
      var numberOfLinesCleared = 1;
    }
    if (gamesPlayed[0]) {
      var numberOfGamesPlayed = gamesPlayed[0].counterValue
    } else {
      var numberOfGamesPlayed = 1;
    }
    res.render('index', { 
      title: 'Gravitris',
      numberOfLinesCleared: numberOfLinesCleared,
      numberOfGamesPlayed: numberOfGamesPlayed,
      app_version: process.env.npm_package_version
    });
  });

});


/* GET game page. */
router.get('/game', function(req, res, next) {

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
      console.log('game | error | could not increase gamesPlayed counter');
    } else {
      // success
    }
  });

  res.render('game', { title: 'Gravitris' });
});


/* Increase the linesCleared counter */
router.get('/increase-linesCleared-counter/:numberOfLinesCleared', function(req, res, next) {
  var numberOfLinesCleared = Number(req.params.numberOfLinesCleared);
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
        console.log('increase-linesCleared-counter | error | could not increase the counter');
        res.status(400).send('error increasing counter', err);
      } else {
        console.log('increase-linesCleared-counter | log | counter increased by ' + numberOfLinesCleared);
        res.sendStatus(200);
      }
    });
  }
});


module.exports = router;
