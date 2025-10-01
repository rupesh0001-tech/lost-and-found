const express = require('express');
const router = express();
const listing = require('../models/listing');
const keyword_extractor = require("keyword-extractor");

router.get('/lost', (req, res) => {
    res.render('lost')
})

router.post('/lost', async (req, res) => {
    //extracted the data 
    let {describtion} = req.body;
    //extract keywords
    const extraction_result = keyword_extractor.extract(describtion,{

    language:"english",
    remove_digits: false,
    return_changed_case:true,
    remove_duplicates: false

    });

    console.log(extraction_result);

    



})

router.get('/found', (req, res) => {
    res.render('found');
})



router.post('/found', async (req, res) => {
    //extract data
    let { title, describtion, img, location } = req.body;

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
    });
    // save new listing in dbs 
    await newListing.save();
    console.log('new listing saved');
    res.send('new listing created')

});

module.exports = router;

