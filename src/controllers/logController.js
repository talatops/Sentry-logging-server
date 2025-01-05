const Log = require('../models/Log');
const winston = require('winston');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5,
    })
  ]
});

exports.createLog = async (req, res) => {
  const { project, repository, environment, message, level = 'info', metadata = {} } = req.body;
  
  if (!project || !repository || !environment || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Save to MongoDB
    const logEntry = new Log({
      project,
      repository,
      environment,
      message,
      level,
      metadata,
      stack: metadata.stack || null
    });

    await logEntry.save();

    // Also log with Winston
    logger.log(level, {
      project,
      repository,
      environment,
      message,
      metadata,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({ message: 'Log recorded successfully' });
  } catch (error) {
    logger.error({
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const { 
      project, 
      repository, 
      environment, 
      level,
      startDate,
      endDate,
      limit = 20,
      skip = 0 
    } = req.query;

    const query = {};
    if (project) query.project = project;
    if (repository) query.repository = repository;
    if (environment) query.environment = environment;
    if (level) query.level = level.toLowerCase();
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const logs = await Log.find(query)
      .sort({ timestamp: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Log.countDocuments(query);

    res.json({
      logs,
      total,
      hasMore: total > (Number(skip) + logs.length)
    });
  } catch (error) {
    logger.error({
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ error: 'Internal server error' });
  }
}; 