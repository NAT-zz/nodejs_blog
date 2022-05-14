const course = require('../models/Course');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../utils/mongoose');

class MeController {
    // GET /stored/courses
    storedCourses(req, res, next) {

        // res.json(res.locals._sort)

        const courseQuery = course.find({})

        if (res.locals._sort.enabled){
            courseQuery.sort({
                [req.query.column] : req.query.type
            })
        }


        Promise.all([courseQuery, course.countDocumentsDeleted()])
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
