import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
const DATA_DIR = process.env.DATA_FILE_PATH
  ? path.resolve(__dirname, process.env.DATA_FILE_PATH)
  : path.join(__dirname, 'data');

const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const CONTACT_FILE = path.join(DATA_DIR, 'contactSubmissions.json');

// Middleware
app.use(cors({
  origin: ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Helper functions for reading and writing persistent JSON storage
const readJsonFile = (filePath, fallback = []) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
};

const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
};

// B1. Health check base route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// B2. GET /api/projects - Serve Project List
app.get('/api/projects', (req, res) => {
  const projects = readJsonFile(PROJECTS_FILE, []);
  res.status(200).json(projects);
});

// B3. GET /api/projects/:id - Serve Single Project
app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const projects = readJsonFile(PROJECTS_FILE, []);
  const project = projects.find((p) => String(p.id) === String(id));

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.status(200).json(project);
});

// B4. POST /api/contact - Handle Contact Form Submission
app.post('/api/contact', (req, res) => {
  const { name, email, message, subject } = req.body || {};
  const fieldErrors = {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    fieldErrors.name = 'Name is required';
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    fieldErrors.email = 'Email is required';
  } else if (!email.includes('@')) {
    fieldErrors.email = 'Invalid email format (must contain @)';
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    fieldErrors.message = 'Message is required';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: fieldErrors,
      message: Object.values(fieldErrors).join(', ')
    });
  }

  const submissions = readJsonFile(CONTACT_FILE, []);
  const newSubmission = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.trim(),
    subject: (subject && typeof subject === 'string') ? subject.trim() : '',
    message: message.trim(),
    submittedAt: new Date().toISOString()
  };

  submissions.push(newSubmission);
  writeJsonFile(CONTACT_FILE, submissions);

  res.status(201).json({
    message: 'Submission received successfully',
    data: newSubmission
  });
});

// B5. GET /api/contact - List Submissions (open verification endpoint)
app.get('/api/contact', (req, res) => {
  const submissions = readJsonFile(CONTACT_FILE, []);
  res.status(200).json(submissions);
});

// B6. Catch-all 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// B6. Centralized global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: err.message || 'An unexpected error occurred'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
