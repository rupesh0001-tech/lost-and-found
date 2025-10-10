// init/init.js
const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { useNewUrlParser: true, useUnifiedTopology: true };
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB Connected");
  return cached.conn;
}

module.exports = connectDB;
