const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// dotenv ko sabse upar require karna behtar hota hai
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(express.json());

// 🌐 Test Route taake browser mein 'Cannot GET /' na aaye
app.get('/', (req, res) => {
  res.send('Zarvix Backend is running perfectly! 🚀');
});

// 🔗 MONGODB CONNECTION (Sirf Ek Dafa)
mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("🔥 BOOM! MongoDB Connected Successfully to Cloud Atlas!"))
   .catch((err) => console.error("❌ DB Connection Error:", err));

// Resume Schema Definition
const ResumeSchema = new mongoose.Schema({
  userId: { type: String, default: "default_user" },
  personalInfo: { fullName: String, jobTitle: String, email: String, phone: String },
  skills: [String],
  languages: [String],
  experience: [{ id: String, company: String, role: String, duration: String, description: String }],
  projects: [{ id: String, title: String, tech: String, desc: String }],
  education: [{ id: String, institute: String, degree: String, duration: String }],
  certificates: [String],
  template: { type: String, default: "modern" }
}, { timestamps: true });

const Resume = mongoose.model('Resume', ResumeSchema);

// API Endpoints
app.post('/api/resume/save', async (req, res) => {
  try {
    const updatedResume = await Resume.findOneAndUpdate(
      { userId: "default_user" },
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, data: updatedResume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/resume/get', async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: "default_user" });
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend server ready on port ${PORT}`));

// Naya Schema
const ReviewSchema = new mongoose.Schema({
  name: { type: String, default: "Anonymous" },
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', ReviewSchema);

// Naya API Route
app.post('/api/reviews/submit', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reviews fetch karne ka route (Home page par dikhane ke liye)
app.get('/api/reviews/get', async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 }).limit(5);
  res.json(reviews);
});

const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log("Database Connection Error:", err));