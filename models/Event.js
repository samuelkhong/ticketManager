const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true // Ensures each event  number is unique
    },
    
    description: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Event', EventSchema);