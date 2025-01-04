const User = require('../models/User');
const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
  try {
    const { rating, comments } = req.body;
    const newFeedback = new Feedback({ rating, comments });
    await newFeedback.save();
    return res.status(200).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Failed to submit feedback.' });
  }
};

module.exports = { submitFeedback };