const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log(`Database connected: ${connection.connection.host}, ${connection.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    };
}
module.exports = connectDB; 