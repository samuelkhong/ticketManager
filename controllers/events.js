const Event = require('../models/Event')

module.exports = {
    getAll : async (req, res) => {
        // get all events and store them as array of events
        try {
            const eventItems =  await Event.find();
            console.log(eventItems)
            // render the events page
            res.render('events.ejs', {events: eventItems, user: req.user})
            
        }
        catch(err){
            console.log(err)
        }
        
    }, 

    getEvent : async (req, res) => {
        try {
            const event = await Event.findById(req.params.id)
            res.render('events.ejs', {events: event, user: req.user})
            
        }
        catch(err) {
            console.log(err)
        }
    }
    // get sample code  

    // getTodos: async (req,res)=>{
    //     try{
    //         const todoItems = await Todo.find()
    //         const itemsLeft = await Todo.countDocuments({completed: false})
    //         res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
    //     }catch(err){
    //         console.log(err)
    //     }
    // }


}