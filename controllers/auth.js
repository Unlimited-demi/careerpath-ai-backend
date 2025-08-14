const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Registration = require('../models/RegisterModel');

exports.login = async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  try {
    let user = await Registration.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    next(error);
