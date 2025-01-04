const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse'); // For extracting text from PDFs
const User = require('../models/User');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir); // Save files to the uploads directory
    },
    filename: function (req, file, cb) {
        const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        console.log("Saving file as:", fileName); // Log the file name
        cb(null, fileName);
    }
});

// File filter to allow only PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept PDF files
    } else {
        cb(new Error('Invalid file type. Only PDF files are allowed.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Function to extract text from PDF
const extractTextFromPDF = async (pdfPath) => {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdf(dataBuffer);
        return data.text; // Extracted text from the PDF
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        throw new Error('Failed to extract text from PDF.');
    }
};

// Controller function to handle resume upload
const uploadResume = async (req, res) => {
    console.log("POST request at /api/resume/upload");

    if (!req.file) {
        console.log("No file uploaded.");
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
        console.log("File uploaded:", req.file);
        const pdfPath = req.file.path;
        console.log("PDF path:", pdfPath);

        // Extract text from the uploaded PDF
        const extractedText = await extractTextFromPDF(pdfPath);
        console.log("Extracted text:", extractedText);

        // Save the extracted text to the database
        let user = await User.findOne();
        if (!user) {
            user = new User({
                resumeData: { text: extractedText }
            });
        } else {
            user.resumeData = { text: extractedText };
        }

        await user.save();
        console.log("Resume data saved to the database.");
        res.status(200).json({ message: 'Resume uploaded and processed successfully' });
    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ message: 'Error processing resume.' });
    }
};

const setCareerGoal = async (req, res) => {
  try {
    const { goal } = req.body;
    let user = await User.findOne();
    if (!user) {
      user = new User();
    }
    user.careerGoal = goal;
    await user.save();

    // Optionally call Gemini with updated user data
    const recs = await generateRecommendations({
      resumeData: user.resumeData,
      careerGoal: user.careerGoal
    });

    // Example: store new skill gaps from recommendations
    if (Array.isArray(recs)) {
      user.skillGaps = recs.map(r => r.title);
      await user.save();
    }

    return res.status(200).json({
      message: 'Career goal saved and recommendations updated',
      skillGaps: user.skillGaps
    });
  } catch (error) {
    console.error('Error setting career goal:', error);
    return res.status(500).json({ message: 'Error setting career goal' });
  }
};

module.exports = { 
  uploadResume, 
  upload,
  setCareerGoal
};