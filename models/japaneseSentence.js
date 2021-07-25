const mongoose = require('mongoose');
const japaneseSentenceSchema = new mongoose.Schema({
    japanese: {
        type: String,
        require: [true, 'Please add a Japanese sentence']
    },
    english: {
        type: String
    }
});

module.exports = mongoose.model('Japanese Sentence', japaneseSentenceSchema);