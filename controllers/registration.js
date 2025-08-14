const { validationResult } = require('express-validator');
const axios = require('axios');
const  Registration  = require('../models/RegisterModel');

exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newRegistration = new Registration({
        ...req.body,
        approved: false
      });
      await newRegistration.save();
      res.status(201).json({ message: 'Registration created successfully', data: newRegistration });
    } catch (error) {
      next(error);
    }
  }

exports.getAllRegistrations = async (req, res, next) => {  try {    const registrations = await Registration.find({});    res.json(registrations);
  } catch (error) {
    next(error);
  }
};

exports.approveRegistration = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Registration.findByIdAndUpdate(id, { approved: true }, { new: true });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};


