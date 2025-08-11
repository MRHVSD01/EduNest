const express = require('express');
const { uploadFormDetail , uploadNotes} = require('../controllers/notesController');
const upload = require('../middlewares/multerMiddleware');

const router = express.Router();

router.post('/upload-form', uploadFormDetail);

router.post('/upload-notes', upload.array("file"), uploadNotes);

module.exports = router;

