const newsRouter = require('./News.route');
const siteRouter = require('./Site.route');
const courseRouter = require('./Courses.route');
const meRouter = require('./Me.route');

function route(app) {
    app.use('/news', newsRouter);

    //using handlebars
    // app.get('/news', (req, res) => {
    //   res.render('news')
    // })

    app.use('/', siteRouter);
    app.use('/courses', courseRouter);
    app.use('/me', meRouter);
}

module.exports = route;
