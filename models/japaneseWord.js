const mongoose = require('mongoose');
const japaneseWordSchema = new mongoose.Schema({
    japanese: {
        type: String,
        require: [true, 'Please add a Japanese term']
    },
    reading: {
        type: String
    },
    english: {
        type: String
    }
});

module.exports = mongoose.model('Japanese Word', japaneseWordSchema);