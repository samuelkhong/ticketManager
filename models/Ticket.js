const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    ticketNumber: {
        type: Number,
        required: true,
        unique: true // Ensures each ticket number is unique
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);
