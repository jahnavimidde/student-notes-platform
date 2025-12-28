const cloudinary = require("../config/cloudinary");
const Note = require("../models/Note");

// @desc    Upload notes (PDF)
// @route   POST /api/notes/upload
// @access  Protected
const uploadNote = async (req, res) => {
  try {
    const { subject, course, semester, topics } = req.body;

    // Validate fields
    if (!subject || !course || !semester || !topics) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    // Upload PDF to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "raw" },
      async (error, uploadedFile) => {
        if (error) {
          return res.status(500).json({ message: "File upload failed" });
        }

        // Save note in DB
        const note = await Note.create({
          subject,
          course,
          semester,
          topics,
          pdfUrl: uploadedFile.secure_url,
          uploadedBy: req.user._id
        });

        res.status(201).json({
          message: "Notes uploaded successfully (pending approval)",
          noteId: note._id
        });
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc    Get all pending notes
// @route   GET /api/notes/pending
// @access  Admin
const getPendingNotes = async (req, res) => {
  try {
    const notes = await Note.find({ status: "pending" })
      .populate("uploadedBy", "name email");

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// @desc    Approve or reject a note
// @route   PUT /api/notes/:id/status
// @access  Admin
const updateNoteStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.status = status;
    await note.save();

    res.json({ message: `Note ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  uploadNote,
  getPendingNotes,
  updateNoteStatus
};

