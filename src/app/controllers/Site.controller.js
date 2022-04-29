class SiteController {

    // GET /
    index(req, res) {
        res.render('home')
    }

    // GET /search
    search(req, res) {
        res.send('THIS IS SEARCH')
    }
}

module.exports = new SiteController;