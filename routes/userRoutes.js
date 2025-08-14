const express = require('express');
const router = express.Router();
const register = require('../controllers/registration')
const { validateRegistration } = require('../validators/registrationValidator');
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

router.post('/register', validateRegistration, register.registerUser);
router.post('/login', authController.login);
router.get('/list', auth, register.getAllRegistrations);
router.patch('/approve/:id', auth, register.approveRegistration);


module.exports = router;

