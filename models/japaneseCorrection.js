const mongoose = require('mongoose');
const japaneseCorrectionSchema = new mongoose.Schema({
    sentenceID: {
        type: String,
        require: [true, 'Please add the original sentence ID']
    },
    correction: {
        type: String,
        require: [true, 'Please add the corrected sentence']
    }
});

module.exports = mongoose.model('Japanese Correction', japaneseCorrectionSchema);