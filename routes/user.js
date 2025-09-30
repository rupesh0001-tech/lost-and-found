const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const User =   require('../models/user');


router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', async (req, res) => {

    //extract and bycrpt password 
    let {name, age, email, phone, password} = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    //save data in db
    let newUser = await new User({

        name : name,
        age : age,
        email : email,
        phone : phone,
        password : hashPassword

    })

    // save and redirect user
    await newUser.save()
    console.log('new user saved');

});



module.exports = router