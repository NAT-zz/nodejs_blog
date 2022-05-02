const newsRouter = require('./News.route');
const siteRouter = require('./Site.route');

function route(app) {
    app.use('/news', newsRouter);

    //using handlebars
    // app.get('/news', (req, res) => {
    //   res.render('news')
    // })

    app.use('/', siteRouter);
}

module.exports = route;
