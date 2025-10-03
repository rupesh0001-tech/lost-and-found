const express = require('express');
const router = express();
const listing = require('../models/listing');
const keyword_extractor = require("keyword-extractor");
const auth = require('../middleware/auth')

router.get('/lost', auth,(req, res) => {
    res.render('lost');
})

router.post('/lost',auth, async (req, res) => {
    //extracted the data 
    let {describtion, location} = req.body;
    

    //extract keywords
    const extraction_result = keyword_extractor.extract(describtion,{

    language:"english",
    remove_digits: false,
    return_changed_case:true,
    remove_duplicates: false

    });
    
    let founds = [];
    // logic to find items 
    // find the items via location
    let founditems =  await listing.find({location : location});
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

