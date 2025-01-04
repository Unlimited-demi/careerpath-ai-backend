const express = require('express');
const router = express.Router();
const { getSkillsAssessment, getLearningRecommendations } = require('../controllers/assessmentController');

router.get('/skills', getSkillsAssessment);
router.get('/recommendations', getLearningRecommendations);


module.exports = router;