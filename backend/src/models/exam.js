const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    examinationDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    },
});

const Examination = mongoose.model('Exam', examSchema);

module.exports = Exam;