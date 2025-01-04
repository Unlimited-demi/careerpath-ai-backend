const User = require('../models/User');

const submitCareerGoal = async (req, res) => {
  try {
       console.log("req.body:", req.body) // Key
       const { goal } = req.body;
       let user = await User.findOne();
      if(!user){
           user = new User({ careerGoal: goal });
      } else {
         user.careerGoal = goal
     }
        await user.save()
    res.status(200).json({ message: 'Career Goal set Successfully' });
  } catch (error) {
    console.error('Error setting career goals:', error);
    res.status(500).json({ message: 'Failed to set career goals' });
  }
};
module.exports = { submitCareerGoal };