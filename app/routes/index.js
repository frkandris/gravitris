var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Counter = require('../models/Counter.model');
var nconf = require('nconf');
var assert = require('assert');

var dbURL = nconf.get('database:MONGODB_URL');
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });


/* GET welcome page. */
router.get('/', function(req, res, next) {

  var numberOfLinesCleared = 1;
  var gamesPlayed = 1;

  var query1 = Counter.findOne({counterName: 'linesCleared'});
  var promise1 = query1.exec();
  assert.ok(promise1 instanceof Promise);

  var query2 = Counter.findOne({counterName: 'gamesPlayed'});
  var promise2 = query2.exec();
  assert.ok(promise2 instanceof Promise);
  
  Promise.all([promise1, promise2]).then(function (result) {
    for (var i = 0; i < result.length; i++) {
      if (result[i].counterName == 'linesCleared') { numberOfLinesCleared = result[i].counterValue; };
      if (result[i].counterName == 'gamesPlayed') { gamesPlayed = result[i].counterValue; };
    }

    res.render('index', { 
      title: 'Gravitris',
      numberOfLinesCleared: numberOfLinesCleared,
      gamesPlayed: gamesPlayed
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
        res.send('error increasing counter', err);
      } else {
        console.log('increase-linesCleared-counter | log | counter increased by ' + numberOfLinesCleared);
        res.send(200);
      }
    });
  }
});


module.exports = router;
