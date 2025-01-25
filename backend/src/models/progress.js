const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchema = new Schema({
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
    // chairId: {
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
    // comments: [{
    //     commenterId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User',
    //         required: true
    //     },
    //     comment: {
    //         type: String,
    //         required: true
    //     },
    //     createdAt: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }],
    status: {
        type: String,
        enum: ['submitted', 'approvedByAdvisor', 'approvedByChair', 'rejected'],
        default: 'submitted'
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

progressSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;