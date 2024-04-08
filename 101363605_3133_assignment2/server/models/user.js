const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        maxlength: 50
    }
});

module.exports = mongoose.model('User', userSchema);
