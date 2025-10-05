const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const User =   require('../models/user');
const { renderFile } = require('ejs');
const jwt = require('jsonwebtoken')

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
    let token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    isAuth = true;
    res.cookie('token', token);
    res.locals.isAuth = true;
    res.redirect('/home', );

});

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', async (req, res) => {
    
    try {
        let { email, password } = req.body;
        let findUser = await User.findOne({ email: email });

        if (!findUser) {
            return res.status(404).send('User not found');
        }

        let Auth = await bcrypt.compare(password, findUser.password);

        if (!Auth) {
            return res.status(401).send('Invalid password');
        }

        let token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token);
        res.locals.isAuth = true;
        res.redirect('/home');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

//logic for logout 
router.get("/logout", (req, res) => {
  // clear the JWT cookie
  res.clearCookie("token", {
  });

  // redirect user back to login page (or home page)
  res.redirect("/home");
});




module.exports = router