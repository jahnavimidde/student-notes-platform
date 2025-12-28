const mongoose = require("mongoose");

// User schema defines how user data is stored in MongoDB
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    googleId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Create User model from schema
const User = mongoose.model("User", userSchema);

module.exports = User;
