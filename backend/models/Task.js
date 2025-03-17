
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseID: { type: String, required: true },
    coursename: { type: String },
    date: { type: Date },
});

module.exports = mongoose.model('Task', taskSchema);
