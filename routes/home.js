const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const User =   require('../models/user');
const requireAuth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

router.get('/home', requireAuth, (req, res) => {
    let isAuth = false;
    const token = req.cookies?.token;
    if (token) {
        try {
            jwt.verify(token, 'SECRET_KEY');
            isAuth = true;
        } catch (err) {
            // Token is invalid or expired, treat as not authenticated
            res.clearCookie('token');
        }
    }
    res.render('home', { isAuth });
});

module.exports = router