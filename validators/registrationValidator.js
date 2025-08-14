const { check } = require('express-validator');

exports.validateRegistration = [
  check('fullName').notEmpty().withMessage('Full name is required.'),
  check('phoneNumber').notEmpty().withMessage('Phone number is required.'),
  check('state').notEmpty().withMessage('State is required.'),
  check('lga').notEmpty().withMessage('LGA is required.'),
  check('program').notEmpty().withMessage('Program is required.'),
  check('date').isISO8601().toDate().withMessage('A valid date is required.'),
  check('signature').notEmpty().withMessage('Signature is required.'),
];
