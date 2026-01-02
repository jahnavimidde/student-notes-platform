// Import Express framework to build the server
const express = require("express");

// Import dotenv to load environment variables from .env file
const dotenv = require("dotenv");
const { protect } = require("./middleware/authMiddleware");


// Import MongoDB connection function
const connectDB = require("./config/db");
const cors = require("cors");


// Load environment variables into process.env
dotenv.config({ path: "./.env" });


// Create an Express application
const app = express();
app.use(cors());
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
// If DB connection fails, server will stop
connectDB();

// Middleware to parse incoming JSON data
// This allows us to access req.body
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);


// Test route to check if server is running
// Accessed when visiting http://localhost:5000
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user
  });
});

// Define port number (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
