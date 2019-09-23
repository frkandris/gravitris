var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Counter = require('../models/Counter.model');
var nconf = require('nconf');

var dbURL = nconf.get('database:MONGODB_URL');
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });


/* GET welcome page. */
router.get('/', function(req, res, next) {
  Counter.findOne( {
    counterName: 'linesCleared'
  }, function(err, counter) {
    if (err) {
      console.log('stat | error | could not find linesCleared counter');
      res.send('stat | error | could not find linesCleared counter');
    } else {
      res.render('index', { 
        title: 'Gravitris',
        numberOfLinesCleared: counter.counterValue 
      });
    }
  })
});


/* GET game page. */
router.get('/game', function(req, res, next) {
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
