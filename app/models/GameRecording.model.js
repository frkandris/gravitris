var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameRecordingSchema = new Schema({
    gameString: Object
});

module.exports = mongoose.model('GameRecording', GameRecordingSchema);

