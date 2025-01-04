const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  contactNumber:{
    type: String,
  },
  resumeData: {
      type: Object,
  },
   skills: {
        type: [String],
        default: []
    },
    skillGaps: {
        type: [String],
        default: []
    },
    // feedback: {
    //     rating: Number,
    //     comments: String
    // },
    careerGoal: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);