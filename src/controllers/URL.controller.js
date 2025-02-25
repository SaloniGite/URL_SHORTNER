const shortid = require('shortid');
const URL_Model = require('../models/URL.model');
const QRCode = require('qrcode')
exports.getHomePage = (req, res) => {
    res.render('Homepage', { error: null });
};

exports.ShortenURL = async (req, res) => {
    try {
        const { longUrl , expirationTime } = req.body;

        if (!longUrl) {
            return res.render('Homepage', { error: "URL is required" });
        }

    
        let existingUrl = await URL_Model.findOne({ longUrl });

        if (existingUrl) {
            const qrCode = await QRCode.toDataURL(`${req.protocol}://${req.get('host')}/shorten/${existingUrl.shortUrl}`)
            return res.render('View_ShortenURL', { longUrl, shortUrl: existingUrl.shortUrl ,qrCode });
        }

       
        const shortUrl = shortid.generate();
        const expiresAt = expirationTime? new Date(Date.now()+expirationTime *60 *1000):null ; 
     
        await URL_Model.create({ longUrl, shortUrl ,expiresAt});
        const qrCode = await QRCode.toDataURL(`${req.protocol}://${req.get('host')}/shorten/${shortUrl}`)
        res.render('View_ShortenURL', { longUrl, shortUrl ,qrCode});
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

exports.Delete_URL = async(req,res)=>{
    try{
        const {shortUrl} = req.params
        const DeletedURL = await URL_Model.findOneAndDelete({shortUrl})
        if(!DeletedURL){
            return res.status(404).render('404',{message:"Short url not found "})
        }
        res.render('Homepage',{message:"URL DELETED SUCCESSFULLY "})
    }catch{
        console.log(error)
        res.status(500).send('internal sever error ')
    }
}
