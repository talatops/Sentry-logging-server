const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const logRoutes = require('./routes/logRoutes');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/logging-server', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', logRoutes);

// Serve log viewer
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/log-viewer.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Logging server running on port ${PORT}`);
}); 