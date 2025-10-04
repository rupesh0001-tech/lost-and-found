const express = require('express');
const router = express();
const listing = require('../models/listing');
const keyword_extractor = require("keyword-extractor");
const requireAuth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

router.get('/lost', requireAuth,(req, res) => {
    let isAuth = false;
    const token = req.cookies?.token;
    if (token) {
        try {
            jwt.verify(token, 'SECRET_KEY');
            isAuth = true;
        } catch (err) {
            res.clearCookie('token');
        }
    }
    res.render('lost', { isAuth });
})

router.post('/lost', requireAuth, async (req, res) => {
    //extracted the data 
    let {describtion, location, title, img} = req.body;
    
    const token = req.cookies?.token;
    const decoded = jwt.verify(token, 'SECRET_KEY');
    const userEmail = decoded.email;
    

    //extract keywords
    const extraction_result = keyword_extractor.extract(describtion,{

    language:"english",
    remove_digits: false,
    return_changed_case:true,
    remove_duplicates: false

    });
    
    const User = require('../models/user');
    const user = await User.findOne({ email: userEmail });
    
    let newLostItem = new listing({
        title: title || 'Lost Item',
        describtion: describtion,
        describtionArr: extraction_result,
        img: img || '',
        location: location,
        status: 'lost',
        Author: [user._id]
    });
    await newLostItem.save();
    
    let founds = [];
    // logic to find items 
    // find the items via location
    let founditems = await listing.find({ location: location, status: 'found' });
    // check each item matchs with that location
    for(let i = 0; i < founditems.length; i++){
        let checkCount = 0;
        for(let item of founditems[i].describtionArr){
            if (extraction_result.includes(item)) {
                checkCount++;
            }
        }
        if(checkCount >= 3){
            founds.push(founditems[i])
        } 
    }

    if(founds){
        res.render('match', {founds})
    }

})

router.get('/found', requireAuth, (req, res) => {
    let isAuth = false;
    const token = req.cookies?.token;
    if (token) {
        try {
            jwt.verify(token, 'SECRET_KEY');
            isAuth = true;
        } catch (err) {
            res.clearCookie('token');
        }
    }
    res.render('found', { isAuth });
})



router.post('/found', requireAuth, async (req, res) => {
    //extract data
    let { title, describtion, img, location } = req.body;
    
    const token = req.cookies?.token;
    const decoded = jwt.verify(token, 'SECRET_KEY');
    const userEmail = decoded.email;
    
    const User = require('../models/user');
    const user = await User.findOne({ email: userEmail });

    //extract keyboard 
    const arr = keyword_extractor.extract(describtion,{

    language:"english",
    remove_digits: false,
    return_changed_case:true,
    remove_duplicates: false

    });
    console.log(arr);

    //save in dbs
    let newListing = new listing({
        title : title,
        describtion: describtion,
        describtionArr : arr,
        img : img,
        location: location,
        status: 'found',
        Author: [user._id]
    });
    // save new listing in dbs 
    await newListing.save();
    console.log('new listing saved');
    res.redirect('/report');

});

router.get('/report', requireAuth, async (req, res) => {
    try {
        const token = req.cookies?.token;
        const decoded = jwt.verify(token, 'SECRET_KEY');
        const userEmail = decoded.email;
        
        const User = require('../models/user');
        const user = await User.findOne({ email: userEmail });
        
        const lostItems = await listing.find({ Author: user._id, status: 'lost' }).sort({ createdAt: -1 });
        const foundItems = await listing.find({ Author: user._id, status: 'found' }).sort({ createdAt: -1 });
        
        let isAuth = true;
        res.render('report', { lostItems, foundItems, isAuth, userName: user.name });
    } catch (error) {
        console.log('Error loading report:', error);
        res.redirect('/login');
    }
});

module.exports = router;

