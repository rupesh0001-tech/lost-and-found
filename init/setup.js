const mongoose = require('mongoose');
const connectDB = require('./init');   // DB connection
const Item = require('../models/listing');        // your Item model schema
const data = require('./data');        // sample data

async function setup() {
  try {
    await connectDB(); 
    console.log("DB connected ✅");

    // Clear old data (optional, so you don’t get duplicates)
    await Item.deleteMany({});
    console.log("Old data cleared 🗑️");

    // Insert sample data
    await Item.insertMany(data);
    console.log("Sample data inserted 🚀");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error while setting up DB ❌", err);
    mongoose.connection.close();
  }
}

setup();
