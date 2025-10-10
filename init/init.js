// init/init.js
const mongoose = require("mongoose");
require('dotenv').config(); // load .env locally

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // Ensure the env variable is defined
    const mongoUri = process.env.MONGO_URL;
    if (!mongoUri) {
      throw new Error(
        "MONGO_URI is not defined in environment variables. Check your .env file or Vercel environment variables."
      );
    }

    const opts = { useNewUrlParser: true, useUnifiedTopology: true };

    // Connect to MongoDB
    cached.promise = mongoose.connect(mongoUri, opts).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB Connected");
  return cached.conn;
}

module.exports = connectDB;
