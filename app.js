// require packages 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();


// require vars and folders
const port = process.env.port || 5000;
const connectDB = require('./init/init');
connectDB();
const rateLimit = require('./middleware/ratelimit');

//require Routes
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const itemRoutes = require('./routes/listing');
const adminRoutes = require('./routes/admin')
const authMiddleware = require("./middleware/auth");


// inbuilt middlewares
app.use(rateLimit);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// routes
app.use('/', homeRoutes);
app.use('/', userRoutes);
app.use('/', itemRoutes);
app.use('/', adminRoutes);

//error handling middleware 
app.use((req, res, next) => {
    console.log(`404 Error - Page not found: ${req.originalUrl}`);
    res.status(404).render('404', { url: req.originalUrl });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
