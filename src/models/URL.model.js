const mongoose = require('mongoose')
const URL_Schema = new mongoose.Schema({
    longUrl:{
        required:   true,
        type :String
    },
    shortUrl:{
        required:  true,
        type :String,
        unique :true 
    },
    clicks:{
        type:Number,
        default:0
    }
})

URL_Model = mongoose.model('URL_Model',URL_Schema)
module.exports = URL_Model