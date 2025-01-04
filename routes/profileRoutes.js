const express = require('express');
    const router = express.Router();
    const { submitCareerGoal } = require('../controllers/profileController.js');

    router.post('/goal', submitCareerGoal);

    module.exports = router;