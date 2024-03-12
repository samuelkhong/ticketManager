const path = require('path');
const Event = require('../models/Event')
const cloudinary = require('../middleware/cloudinary')



module.exports = {

        getForm: (req, res) => {
            const filePath = path.join(__dirname, '..', 'views', 'newEvent.html');
            res.sendFile(filePath)
        },

        formUpload: async(req, res) => {
            // get the img file a
            if (req.file) {
                try {
                    console.log(req.body)
                    // Upload image to cloudinary
                    const result = await cloudinary.uploader.upload(req.file.path);

                    //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content 
                    await Event.create({
                        number: await Event.countDocuments() + 1,
                        description: req.body.description,
                        date: req.body.eventDate,
                        image: result.url
                   
                    });

                    console.log("Event has been added!");
                    res.redirect("/test");
                    } catch (err) {
                    console.log(err);
                    console.log('cannot upload image')
                    }

                }
            },
            
    
        displayForm : async (req,res) => {
            try {
                // get a count of the total amount of events
                const eventCount = await Event.countDocuments();
                const data = req.body;
                console.log(data);
                // check if the form submission has empty data fields. 
                if (data.description === "" || data.eventDate === "" || data.eventImage === "") {
                    console.log('missing data');
                    
                }
                else {
                    // get just the image filename with extension
                    const filePath = data.eventImage.trim() // removes whitespace
                    console.log(filePath);
                    const fileName = path.basename(filePath);
                    //console.log(fileName);
                    // check if event image is valid based on extension
                    if (!isValidImage(fileName)) {
                        console.log('invalid file')
                    }
                    else {
                        // upload file to cloudinary 
                        const publicID = uploadImage(filePath);
                        // get URL of the image 
                        const imageURL = cloudinary.url(publicID);

                        // create a new instance of an event
                        await Event.create({eventNumber: eventCount + 1, eventDescription: data.description,
                                            date: data.eventDate, eventImage: imageURL});
                    }
                }
                res.redirect('/test');

            }catch(err) {
                console.log(err);
            }             
        }
    }
