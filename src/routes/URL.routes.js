const express = require('express')
const router =express.Router()
const {ShortenURL,getHomePage , ViewShorten} = require('../controllers/URL.controller')
router.post('/URL-SHORTNER',ShortenURL)
router.get('/',getHomePage )
router.get('/shorten/:shortUrl',ViewShorten)

module.exports = router