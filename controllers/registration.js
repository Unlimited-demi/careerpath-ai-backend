const { validationResult } = require('express-validator');
const axios = require('axios');
const  Registration  = require('../models/RegisterModel');

const logger = require('../config/logger');

exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validation errors in user registration', { errors: errors.array() });
    }

    try {
      const newRegistration = new Registration({
        ...req.body,
        approved: false
      });
      await newRegistration.save();
      logger.info(`New user registered: ${newRegistration.fullName}`);
      res.status(201).json({
        success: true,
        status: 201,
        message: 'Registration created successfully',
        data: newRegistration,
      });
    } catch (error) {
      logger.error('Error during user registration', { error: error.message, stack: error.stack });
      next(error);
    }
  }

exports.getAllRegistrations = async (req, res, next) => {  try {    const registrations = await Registration.find({});    res.json(registrations);
  } catch (error) {
    logger.info('Successfully retrieved all registrations');
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Registrations retrieved successfully',
      data: registrations,
    });
  }
};

exports.approveRegistration = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Registration.findByIdAndUpdate(id, { approved: true }, { new: true });
    logger.info(`Registration approved for user ID: ${id}`);
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Registration approved successfully',
      data: updated,
    });
  } catch (error) {
    logger.error(`Error approving registration for user ID: ${id}`, { error: error.message, stack: error.stack });
    next(error);
  }
};


