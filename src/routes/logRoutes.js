const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { createLog, getLogs } = require('../controllers/logController');

// Logging routes
router.post('/log', authenticateToken, createLog);
router.get('/logs', authenticateToken, getLogs);

module.exports = router; 