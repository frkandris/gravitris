var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
    counterName: String,
    counterValue: Number
});

module.exports = mongoose.model('Counter', CounterSchema);

