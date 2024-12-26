const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const authRoute = require('./routes/authRoute');

connectDB();
const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use('/api/auth', authRoute);

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});