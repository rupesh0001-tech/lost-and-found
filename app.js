// require packages 
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// require DB connection
const connectDB = require('./init/init');

// require Routes
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const itemRoutes = require('./routes/listing');
const adminRoutes = require('./routes/admin');
const otherRoutes = require('./routes/other');

// inbuilt middlewares
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
app.use('/', otherRoutes);

//error handling middleware 
app.use((req, res, next) => {
    console.log(`404 Error - Page not found: ${req.originalUrl}`);
    res.status(404).render('404', { url: req.originalUrl });
});

// connect to DB and start server
const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
