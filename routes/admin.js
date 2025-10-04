const express = require('express');
const router = express();
const Item = require('../models/listing');
const Admin = require('../models/admin');
const requireAdminAuth = require('../middleware/adminAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/admin/login', (req, res) => {
    res.render('admin-login');
});

router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        let admin = await Admin.findOne({ username });
        
        if (!admin) {
            return res.send('Invalid admin credentials');
        }
        
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        
        if (!isPasswordValid) {
            return res.send('Invalid admin credentials');
        }
        
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: 'admin' },
            'ADMIN_SECRET_KEY',
            { expiresIn: '4h' }
        );
        
        res.cookie('adminToken', token, {
            httpOnly: true,
            maxAge: 4 * 60 * 60 * 1000
        });
        
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log('Error during admin login:', error);
        res.send('Something went wrong');
    }
});

router.get('/admin/dashboard', requireAdminAuth, async (req, res) => {
    try {
        let items = await Item.find({}).populate('Author');
        res.render('admin', { items });
    } catch (error) {
        console.log('Something went wrong while accessing the admin dashboard');
        res.send('Error loading dashboard');
    }
});

router.get('/admin/logout', (req, res) => {
    res.clearCookie('adminToken');
    res.redirect('/admin/login');
});

module.exports = router;
