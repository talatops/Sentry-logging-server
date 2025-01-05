# Eliza Logging System

A comprehensive logging system for the Eliza project with a modern web UI for log visualization.

## Features

- Centralized logging server with MongoDB storage
- Real-time log visualization
- Log filtering by environment, level, and date range
- Auto-refresh functionality
- Detailed log inspection
- JWT authentication
- Winston logging integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/logging-server
JWT_SECRET=your-secret-key
PORT=7000
```

3. Start MongoDB:
Make sure your MongoDB server is running locally or update the MONGODB_URI accordingly.

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

5. Access the log viewer:
Open `log-viewer.html` in your web browser to view the logs.

## Usage

### Backend Integration

To integrate logging in your backend services, use the provided `logToServer` function in `backend.js`:

```javascript
const logger = require('./backend');

// Log levels: error, warn, info, debug
logger.error('Error message', { error: new Error('Something went wrong') });
logger.warn('Warning message', { customData: 'value' });
logger.info('Info message');
logger.debug('Debug message');
```

### Log Viewer

The log viewer provides the following features:
- Filter logs by environment (development/production)
- Filter by log level (error/warn/info/debug)
- Filter by date range
- Auto-refresh (5s, 10s, 30s intervals)
- Detailed log inspection
- Pagination

## Security

The logging server uses JWT authentication. Make sure to:
1. Set a strong JWT_SECRET in your environment variables
2. Keep your JWT tokens secure
3. Rotate tokens periodically
4. Use HTTPS in production

## Maintenance

- Log files are automatically rotated at 5MB
- Keep 5 backup files
- Monitor disk space usage
- Regularly backup MongoDB data

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 