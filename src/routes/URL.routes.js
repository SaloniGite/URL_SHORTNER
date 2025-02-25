const express = require('express')
const router =express.Router()
const {ShortenURL,getHomePage , ViewShorten,Delete_URL} = require('../controllers/URL.controller')
router.post('/URL-SHORTNER',ShortenURL)
router.get('/',getHomePage )
router.get('/shorten/:shortUrl',ViewShorten)
router.post('/delete/:shortUrl',Delete_URL)
module.exports = router