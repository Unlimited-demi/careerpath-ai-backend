const express = require('express');
const router = express.Router();
const { uploadResume, upload, setCareerGoal } = require('../controllers/resumeController');

// Route for uploading resumes
router.post('/upload', upload.single('file'), uploadResume);
router.post('/goal', setCareerGoal);

module.exports = router;