// require packages 
const express = require('express');
const app = express();
const mongoose = require('mongoose')


// require vars and folders
const port = 3000;
const connectDB = require('./init/init');
connectDB();


app.get('/', (req, res) => {
    res.send('this is root route')
})

app.listen(port, () => {
    console.log(`server is on at port: 3000`)
})