const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoutes');
const milestoneRoutes = require('./routes/milestoneRoutes');
const noteRoutes = require('./routes/noteRoutes');
const progressRoutes = require('./routes/progressRoutes');
const proposalRoutes = require('./routes/proposalRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const dissertationRoutes = require('./routes/dissertationRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const examRoutes = require('./routes/examRoutes');

connectDB();
const app = express();
dotenv.config();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/progresses', progressRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/dissertations', dissertationRoutes);

//Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});