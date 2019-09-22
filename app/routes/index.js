var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Counter = require('../models/Counter.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Gravitris' });
});

module.exports = router;
