// Import mongoose to connect Node.js with MongoDB
const mongoose = require("mongoose");

// Function to establish MongoDB connection
const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from .env
    await mongoose.connect(process.env.MONGO_URI);

    // Log success message if connection is successful
    console.log("MongoDB connected successfully");
  } catch (error) {
    // Log error message if connection fails
    console.error("MongoDB connection failed:", error.message);

    // Stop the server if database connection fails
    process.exit(1);
  }
};

// Export the function so it can be used in server.js
module.exports = connectDB;
