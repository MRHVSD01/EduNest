// const express = require("express");
// const {
//   uploadFormDetail,
//   uploadNotes,
//   getUserNotes,
// } = require("../controllers/notesController");
// const upload = require("../middlewares/multerMiddleware");
// const authMiddleware = require("../middlewares/authMiddleware");

// const router = express.Router();

// router.post("/upload-form", uploadFormDetail);
// // router.post("/upload-form", authMiddleware, uploadFormDetail);

// router.post("/upload-notes", upload.array("file"), uploadNotes);

// router.get("/notes/my", authMiddleware, getUserNotes);

// module.exports = router;

const express = require("express");
const {
  uploadFormDetail,
  uploadNotes,
  getUserNotes,
} = require("../controllers/notesController");
const upload = require("../middlewares/multerMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected route: upload form details
router.post("/upload-form", authMiddleware, uploadFormDetail);

// Protected route: upload notes files
router.post("/upload-notes", authMiddleware, upload.array("file"), uploadNotes);

// Protected route: get user notes
router.get("/notes/my", authMiddleware, getUserNotes);

module.exports = router;
