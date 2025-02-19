const mongoose = require('mongoose')
const connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected")
    }catch(error){
        console.error("Mongodb is not connected ",error)
        process.exit(1)
    }
}

module.exports = connection