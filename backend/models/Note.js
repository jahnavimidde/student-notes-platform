const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    semester: {
      type: String,
      required: true
    },
    topics: {
      type: String,
      required: true
    },
    pdfUrl: {
      type: String,
      required: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
