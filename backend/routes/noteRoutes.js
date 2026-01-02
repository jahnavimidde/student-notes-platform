const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// DEBUG (NOW it is valid)
console.log({
  protect: typeof authMiddleware.protect,
  isAdmin: typeof adminMiddleware.isAdmin,
  getPendingNotes: typeof noteController.getPendingNotes
});

// Student uploads notes
router.post(
  "/upload",
  authMiddleware.protect,
  upload.single("pdf"),
  noteController.uploadNote
);
// Students view approved notes
router.get(
  "/",
  authMiddleware.protect,
  noteController.getApprovedNotes
);
// View single approved note (PDF)
router.get(
  "/:id",
  authMiddleware.protect,
  noteController.getNoteById
);


// Admin views pending notes
router.get(
  "/pending",
  authMiddleware.protect,
  adminMiddleware.isAdmin,
  noteController.getPendingNotes
);

// Admin approves / rejects notes
router.put(
  "/:id/status",
  authMiddleware.protect,
  adminMiddleware.isAdmin,
  noteController.updateNoteStatus
);

module.exports = router;
