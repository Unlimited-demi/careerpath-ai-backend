const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const resumeRoutes = require('./routes/resumeRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(cors()); // Keep this first
app.use(express.json()); // Add this to parse JSON request bodies

// Connect Database
connectDB();

// Routes
app.use('/api/resume', resumeRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/profile', profileRoutes); // New Profile Routes

// Home route
app.get('/', (req, res) => {
    res.send('Career Path AI Backend is up!');
});

// Profile route
app.get('/api/profile', async (req, res) => {
    try {
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ message: 'No profile data yet' });
        }
        const profile = {
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber
        };
        res.status(200).json({ profile });
    } catch (error) {
        res.status(500).json({ message: 'Error getting user profile' });
    }
});

module.exports = app;