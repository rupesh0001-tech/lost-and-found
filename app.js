// require packages 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')



// require vars and folders
const port = 3000;
const connectDB = require('./init/init');
connectDB();
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const itemRoutes = require('./routes/listing')

//middlewares
app.set('view engine', 'ejs'); // or pug, hbs etc.
app.set('views', path.join(__dirname, 'views')); // folder for templates
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.urlencoded({ extended: true })); // for HTML form POST
app.use(express.json()); // for JSON requests



//setup routes 
app.use('/', userRoutes);
app.use('/', homeRoutes);
app.use('/', itemRoutes)

app.listen(port, () => {
    console.log(`server is on at port: 3000`)
})