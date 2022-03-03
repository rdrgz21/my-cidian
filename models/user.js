const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter an email address']
    },
    password: {
        type: String,
        required: [true, 'Please choose a password']
    }
});

module.exports = mongoose.model('User', userSchema);