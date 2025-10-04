// require packages 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// require vars and folders
const port = 3000;
const connectDB = require('./init/init');
connectDB();

const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const itemRoutes = require('./routes/listing');
const adminRoutes = require('./routes/admin')
const authMiddleware = require("./middleware/auth");

// inbuilt middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// auth middleware (must come AFTER cookieParser)
// app.use(authMiddleware); // Moved to specific routes

// routes
app.use('/', homeRoutes);
app.use('/', userRoutes);
app.use('/', itemRoutes);
app.use('/', adminRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
