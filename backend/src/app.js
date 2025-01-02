const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoutes');
const milestoneRoutes = require('./routes/milestoneRoutes');
const reportRoutes = require('./routes/reportRoutes');

connectDB();
const app = express();
dotenv.config();

//Middlewares
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/reports', reportRoutes);

//Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});