const express = require('express')
const app = express()
app.set('view engine','ejs')
const path = require('path');
const bodyParser = require('body-parser')
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
const connection = require('./config/db.config')
connection()
const URL_Model = require('./models/URL.model')
const URL_ROUTES = require('./routes/URL.routes')
app.use('/',URL_ROUTES)
const PORT = process.env.PORT||3000
app.set('views', path.join(__dirname, '../views')); 
module.exports = {app , PORT} 