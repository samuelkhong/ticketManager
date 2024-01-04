const Ticket = require('../models/Ticket');

module.exports = {
    createTicket: async (req, res)=>{
        try {
            // Total number of tickets
            const numTickets = await Ticket.find().countDocuments();
            
            await Ticket.create({ ticketNumber: numTickets + 1 });

            console.log('Ticket has been created!');
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
};
