
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    cname: { type: String, required: true , unique: true },
    cdetail: { type: String, required: true},
    cdate: { type: Date, required: true }
});

module.exports = mongoose.model('Course', courseSchema);

// this is Comment
