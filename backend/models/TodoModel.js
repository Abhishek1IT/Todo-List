const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema ({
    task: {
        type: String,
        require: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);