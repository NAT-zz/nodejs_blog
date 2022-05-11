const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const moongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: {
            type: String,
            default: 'new course',
            maxlength: 255,
            required: true,
        },
        description: { type: String, maxlength: 600 },
        image: { type: String, maxlength: 600 },
        videoID: { type: String, maxlength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(slug);
Course.plugin(moongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true });

module.exports = mongoose.model('Course', Course);
