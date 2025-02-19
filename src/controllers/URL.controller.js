const shortid = require('shortid');
const URL_Model = require('../models/URL.model');

exports.getHomePage = (req, res) => {
    res.render('Homepage', { error: null });
};

exports.ShortenURL = async (req, res) => {
    try {
        const { longUrl } = req.body;

        if (!longUrl) {
            return res.render('Homepage', { error: "URL is required" });
        }

    
        let existingUrl = await URL_Model.findOne({ longUrl });

        if (existingUrl) {
            return res.render('View_ShortenURL', { longUrl, shortUrl: existingUrl.shortUrl });
        }

       
        const shortUrl = shortid.generate();
        await URL_Model.create({ longUrl, shortUrl });

        res.render('View_ShortenURL', { longUrl, shortUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.ViewShorten = async (req, res) => {
    try {
        const url = await URL_Model.findOne({ shortUrl: req.params.shortUrl });

        if (!url) {
            return res.status(404).render('404', { message: "Short URL not found" });
        }

   
        url.clicks += 1;
        await url.save();

        res.redirect(url.longUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
