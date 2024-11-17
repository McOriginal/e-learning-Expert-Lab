const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userMessageSchema = new Schema({
    nom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    dateEnvoi: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('UserMessage', userMessageSchema);
