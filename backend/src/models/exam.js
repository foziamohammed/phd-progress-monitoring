const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    examDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;