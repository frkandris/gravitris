const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameRecordingSchema = new Schema({
    gameString: Object
});

module.exports = mongoose.model('GameRecording', GameRecordingSchema);

