const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');

        console.log('connect done');
    } catch (error) {
        console.log('connect failed');
    }
}

//export object
module.exports = { connect };
