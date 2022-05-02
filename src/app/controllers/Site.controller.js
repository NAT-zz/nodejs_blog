const course = require('../models/Course');
const { mongooseToObject, multipleMongooseToObject} = require('../../utils/mongoose')

class SiteController {
    // GET /
    index(req, res, next) {
        course.find({})
            .then(courses => res.render('home', { 
                courses: multipleMongooseToObject(courses)
             }))
            .catch(next) // == error => next(error)
    }

    // GET /search
    search(req, res) {
        res.send('THIS IS SEARCH');
    }
}

module.exports = new SiteController();