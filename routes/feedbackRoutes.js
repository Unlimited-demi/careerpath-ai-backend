const express = require('express');
const router = express.Router();
const { getAllFeedback, submitFeedback } = require('../controllers/feedbackController');

router.get('/', getAllFeedback);
router.post('/submit', submitFeedback);

module.exports = router;