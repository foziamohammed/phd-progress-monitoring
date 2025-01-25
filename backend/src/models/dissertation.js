const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dissertationSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // advisorId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    file: {
        type: Buffer,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approvedByAdvisor', 'approvedByChair'],
        default: 'pending'
    },
    result: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

dissertationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Dissertation = mongoose.model('Dissertation', dissertationSchema);

module.exports = Dissertation;