const mongoose = require('mongoose');
 async function connectDB() {
    try{
        await mongoose.connect((process.env.MONGO_URL), {
        
        });
        console.log('connected to DB');
    }catch{
        console.log('error while connecting Db')
    }
 }
    

module.exports = connectDB;