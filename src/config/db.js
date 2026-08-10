const mongoose = require("mongoose");

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured. Add it to your .env file.");
  }

  mongoose.set("strictQuery", true);

  const connection = await mongoose.connect(mongoUri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
}

module.exports = connectDB;
