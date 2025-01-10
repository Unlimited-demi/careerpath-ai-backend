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

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    return res.status(200).json({ feedbacks });
  } catch (err) {
    console.error('Error fetching feedback:', err);
    return res.status(500).json({ message: 'Failed to fetch feedback.' });
  }
};

module.exports = { submitFeedback, getAllFeedback };