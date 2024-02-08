const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    ticketNumber: {
        type: Number,
        required: true,
        unique: true // Ensures each ticket number is unique
    },

    used: {
        type: Boolean,
        required: true,
        default: false,        
    },

    hashValue: {
        type: String, // Assuming the hash value is a string
    }

});

module.exports = mongoose.model('Ticket', TicketSchema);
