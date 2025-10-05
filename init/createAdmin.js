const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
require('dotenv').config();

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to DB');

        const existingAdmin = await Admin.findOne({ username: process.env.admin_username });
        
        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(process.env.admin_password, 10);
        
        const admin = new Admin({
            username: process.env.admin_username,
            password: hashedPassword,
            role: 'admin',
        });

        await admin.save();
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();
