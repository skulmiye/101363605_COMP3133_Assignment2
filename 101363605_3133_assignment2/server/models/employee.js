const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);