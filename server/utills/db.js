const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 20000,
    });

    console.log("MongoDB connected successfully to VGM database");

    const collections = await mongoose.connection.db.collections();
    console.log(
      "Available collections:",
      collections.map((c) => c.collectionName).join(", ")
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDb;
