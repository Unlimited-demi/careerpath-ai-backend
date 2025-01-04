const { generateSkills, generateRecommendations } = require('../utils/geminiUtils');
const User = require('../models/User');

const getSkillsAssessment = async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ error: "No user data found" });
    }
    const { resumeData, careerGoal } = user;

    const skillsResponse = await generateSkills(resumeData, careerGoal);
    
    if (skillsResponse.error) {
      return res.status(500).json({ error: skillsResponse.message || "Failed to process request" });
    }

    return res.status(200).json({ geminiSkills: skillsResponse });
  } catch (error) {
    console.error('Error in getSkillsAssessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLearningRecommendations = async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ error: "No user data found" });
    }
    const resumeData = user.resumeData;
    const careerGoal = user.careerGoal;

    const recommendationsResponse = await generateRecommendations({ resumeData, careerGoal });
    if (recommendationsResponse.error) {
      return res.status(500).json({ error: recommendationsResponse.message || 'Failed to process request' });
    }

    return res.status(200).json({ geminiRecommendations: recommendationsResponse });
  } catch (error) {
    console.error('Error in getLearningRecommendations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getSkillsAssessment, getLearningRecommendations };