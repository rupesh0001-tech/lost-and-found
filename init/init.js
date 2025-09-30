const mongoose = require('mongoose');
 async function connectDB() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/lostandfind', {
        
        });
        console.log('connected to DBs');
    }catch{
        console.log('error while connecting Db')
    }
 }
    

module.exports = connectDB;