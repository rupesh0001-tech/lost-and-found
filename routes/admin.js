const express = require('express');
const router = express();
const Item = require('../models/listing')


router.get('/admin', async(req, res) => {
    try{
        let items = await Item.find({});
        console.log(items);
        res.render('admin', {items});
    }catch(error){
        console.log('somthing went wrong while acessing the admin ')
    }
    
})

module.exports = router