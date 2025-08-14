const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const register = require('../controllers/registration')
const { validateRegistration } = require('../validators/registrationValidator');
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many registration attempts from this IP, please try again after 15 minutes',
});


router.post('/register', registerLimiter, validateRegistration, register.registerUser);
router.post('/login', authController.login);
router.get('/list', auth, register.getAllRegistrations);
router.patch('/approve/:id', auth, register.approveRegistration);


module.exports = router;

