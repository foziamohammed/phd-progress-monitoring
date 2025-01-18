const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./config/db'); // Import the database connection
const meetingRoutes = require('./routes/meetingRoutes'); // Import routes

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/meeting-requests', meetingRoutes); // Use the meeting routes

// Home Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
