const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameRecordingSchema = new Schema({
    gameDate: Date,
    playerName: String,
    gameLevel: Number,
    points: Number,
    gameBlocks: { type: [Number] },
    gameString: Object
});

module.exports = mongoose.model('GameRecording', GameRecordingSchema);

