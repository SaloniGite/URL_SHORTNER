require('dotenv').config()
const {app,PORT} = require('./src/app')

app.listen(PORT,()=>{
    console.log(`Connected to ${PORT}`)
})