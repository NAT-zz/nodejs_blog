const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: 'new course', maxlength: 255 },
    description: { type: String, maxlength: 600 },
    image: { type: String, maxlength: 600 },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);
