const course = require('../models/Course');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../utils/mongoose');

class MeController {
    // GET /stored/courses
    storedCourses(req, res, next) {

        Promise.all([course.find({}), course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-coures', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                })
            })
            .catch(next)
    }

    //GET /trash/coures
    trashCourses(req, res, next){
        course
            .findDeleted({})
            .then((courses) => 
                res.render('me/trash-coures', {
                    courses: multipleMongooseToObject(courses)
                })
            )
            .catch(next)
    }
}

module.exports = new MeController();
