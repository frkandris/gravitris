const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameRecordingSchema = new Schema({
    gameDate: Date,
    gameBlocks: { type: [Number] },
    gameString: Object
});

module.exports = mongoose.model('GameRecording', GameRecordingSchema);

