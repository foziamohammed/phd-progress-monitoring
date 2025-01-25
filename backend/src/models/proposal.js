const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proposalSchema = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

proposalSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;