const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addCours = new Schema({
    
    title: {
        type: String,
        required: true,
    },

    detail: String,

    duree: {
        type: String,
        required: true,
    },

    lessons: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String,
        required: true,
    },
    videos: {
        type: [String],
        required: true,
    },

    addDate: {
        type: Date,
        default:  Date.now(),
    }

});

module.exports = mongoose.model('Cours', addCours);