const course = require('../models/Course');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../utils/mongoose');
const res = require('express/lib/response');

class CoursesController {
    // GET /courses/:slug
    show(req, res, next) {
        course
            .findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    //GET /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //POST /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/mqdefault.jpg`;
        

        const newCourse = new course(formData);
        //bvZ1_P9eCpw
        newCourse.save().then(() => res.redirect('/')).then(next);
    }

    //GET /courses/:id/edit
    edit(req, res, next) {
        course
            .findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    //PUT /courses/:id
    update(req, res, next) {
        course
            .updateOne({ _id: req.params.id }, req.body)
            .then(res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //DELETE /courses/:id/delete
    delete(req, res, next) {
        course
            .delete({ _id: req.params.id })
            .then(res.redirect('back'))
            .catch(next);
    }

    //DELETE /courses/:id/forced
    forcedDelete(req, res, next) {
        course
            .deleteOne({ _id: req.params.id })
            .then(res.redirect('back'))
            .catch(next);
    }

    //PATCH /courses/:id/restore
    restore(req, res, next) {
        course
            .restore({ _id: req.params.id })
            .then(res.redirect('back'))
            .catch(next)
    }

    //POST /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                course
                .delete({ _id: { $in: req.body.courseIds }})
                .then(res.redirect('back'))
                .catch(next);
                break
            default:
                res.json({ message: 'Invalid action' })
        }
    }
}
module.exports = new CoursesController();
