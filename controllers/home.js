const path = require('path');


module.exports = {
    getIndex: (req,res) => {
        res.render('qrTest.ejs', {user: req.user})
    }
}