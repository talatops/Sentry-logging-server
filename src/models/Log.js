const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  project: String,
  repository: String,
  environment: String,
  message: String,
  level: String,
  timestamp: { type: Date, default: Date.now },
  metadata: mongoose.Schema.Types.Mixed,
  stack: String
});

module.exports = mongoose.model('Log', LogSchema); 