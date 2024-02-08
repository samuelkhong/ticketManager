const crypto = require('crypto');
const Ticket = require('../models/Ticket');
const qrcode = require('qrcode');


module.exports = {
    getTicket: async (req, res)=>{
        try {
            console.log("get request recieved with checkout")
            const ticketRequested = await Ticket.find({hashValue:req.query.name })
            if (!ticketRequested.length) {
                return res.status(400).send('Ticket name is missing in the query parameters');
            }
            console.log('ticket found')
            console.log(req.query.name)
            return res.status(200).send('ticket ok')
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    createTicket: async (req, res)=>{
        try {
            console.log("post request recieved with checkout")
            // Total number of tickets
            const numTickets = await Ticket.find().countDocuments();
            const newTicket = await Ticket.create({ ticketNumber: numTickets + 1})

            // Use objectId to generate hash
            const hashResult = hashify(newTicket._id.toString()); // Convert _id to string

            // Generate QR code
            const qrCode = await hashToQR(hashResult)
            // console.log(qrCode)

            // Store the hash in the ticket document
            newTicket.hashValue = hashResult;
            await newTicket.save()

            console.log('Hash Result:', hashResult)
            console.log('Ticket has been created!')

            res.json({ qrCode });  // Sending JSON response

            //res.status(200).json({ message: 'sucess.' })
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
};

// takes ticketID and returns string hash of ID
function hashify(ticketID) {
    // create sha256 hash
    const hash = crypto.createHash('sha256')
    hash.update(ticketID.toString())
    return hash.digest('hex')
}

function hashToQR(hash) {
    return qrcode.toDataURL(hash);
}
