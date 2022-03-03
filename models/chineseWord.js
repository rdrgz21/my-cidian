const mongoose = require('mongoose');
const chineseWordSchema = new mongoose.Schema({
    chinese: {
        type: String,
        require: [true, 'Please add a Chinese term']
    },
    characters: {
        type: Array,
        require: [true, 'Please add the corresponding characters']
    },
    pinyin: {
        type: Array,
        require: [true, 'Please add the corresponding pinyin']
    },
    tones: {
        type: Array,
        require: [true, 'Please add the corresponding tones']
    },
    english: {
        type: String
    },
    username: {
        type: String,
        require: [true, 'Please add the username of whoever added this to the database']
    }
});

module.exports = mongoose.model('Chinese Word', chineseWordSchema);