const express = require('express');
const router = express.Router(); // ✅ use router, not express()
const listing = require('../models/listing');
const keyword_extractor = require("keyword-extractor");
const requireAuth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary'); // ✅ ensure this exports cloudinary.v2
const { upload } = require('../multer'); // your multer setup
const User = require('../models/user');

// GET Lost Page
router.get('/lost', requireAuth, (req, res) => {
    let isAuth = false;
    const token = req.cookies?.token;
    if (token) {
        try { jwt.verify(token, process.env.JWT_SECRET_KEY); isAuth = true; }
        catch (err) { res.clearCookie('token'); }
    }
    res.render('lost', { isAuth });
});

// POST Lost Item
router.post('/lost', requireAuth, async (req, res) => {
    try {
        const { describtion, location, title, img } = req.body;

        const token = req.cookies?.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userEmail = decoded.email;

        const user = await User.findOne({ email: userEmail });
        if (!user) return res.status(404).send('User not found');

        // Extract keywords
        const extraction_result = keyword_extractor.extract(describtion, {
            language: "english",
            remove_digits: false,
            return_changed_case: true,
            remove_duplicates: false
        });

        const newLostItem = new listing({
            title: title || 'Lost Item',
            describtion,
            describtionArr: extraction_result,
            img: img || '',
            location,
            status: 'lost',
            Author: user._id
        });

        await newLostItem.save();

        // Find matches
        let founds = [];
        const foundItems = await listing.find({ location, status: 'found' });
        for (let item of foundItems) {
            let matchCount = item.describtionArr.filter(tag => extraction_result.includes(tag)).length;
            if (matchCount >= 3) founds.push(item);
        }

        if (founds.length > 0) {
            res.render('match', { founds });
        } else {
            res.redirect('/report');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// GET Found Page
router.get('/found', requireAuth, (req, res) => {
    let isAuth = false;
    const token = req.cookies?.token;
    if (token) {
        try { jwt.verify(token, process.env.JWT_SECRET_KEY); isAuth = true; }
        catch (err) { res.clearCookie('token'); }
    }
    res.render('found', { isAuth });
});

// POST Found Item with Image Upload
router.post('/found', requireAuth, upload.single('img'), async (req, res) => {
    try {
        const { title, describtion, location } = req.body;

        const token = req.cookies?.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userEmail = decoded.email;

        const user = await User.findOne({ email: userEmail });
        if (!user) return res.status(404).send('User not found');

        // Extract keywords
        const arr = keyword_extractor.extract(describtion, {
            language: "english",
            remove_digits: false,
            return_changed_case: true,
            remove_duplicates: false
        });

        // Upload image if provided
        let imgUrl = '';
        if (req.file) {
            const streamUpload = (fileBuffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'lostfound' },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    stream.end(fileBuffer);
                });
            };
            const result = await streamUpload(req.file.buffer);
            imgUrl = result.secure_url;
        }

        // Save found listing
        const newListing = new listing({
            title: title || 'Found Item',
            describtion,
            describtionArr: arr,
            img: imgUrl,
            location,
            status: 'found',
            Author: user._id
        });

        await newListing.save();
        console.log('New listing saved successfully');

        res.redirect('/report');

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// GET User Report
router.get('/report', requireAuth, async (req, res) => {
    try {
        const token = req.cookies?.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userEmail = decoded.email;

        const user = await User.findOne({ email: userEmail });
        if (!user) return res.redirect('/login');

        const lostItems = await listing.find({ Author: user._id, status: 'lost' }).sort({ createdAt: -1 });
        const foundItems = await listing.find({ Author: user._id, status: 'found' }).sort({ createdAt: -1 });

        res.render('report', { lostItems, foundItems, isAuth: true, userName: user.name });
    } catch (error) {
        console.error('Error loading report:', error);
        res.redirect('/login');
    }
});

module.exports = router;
