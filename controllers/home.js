const path = require('path');
const parentDirectory = path.dirname(__dirname);


module.exports = {
    getIndex: (req,res)=>{
        res.sendFile(parentDirectory + '/public/index.html')
    }
}