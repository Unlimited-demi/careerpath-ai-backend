const express = require('express');
const router = express.Router();
const register = require('../controllers/registration')
const { validateRegistration } = require('../validators/registrationValidator');

router.post('/register', validateRegistration, register.registerUser);
router.get('/list', register.getAllRegistrations);
router.patch('/approve/:id', register.approveRegistration);


module.exports = router;
