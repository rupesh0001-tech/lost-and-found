const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const User =   require('../models/user');


router.get('/home', (req, res) => {
    res.render('home')
});

module.exports = router