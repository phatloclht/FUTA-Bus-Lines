const express = require('express');
const HomeController = require('../Controller/HomeController');
const router = express.Router();

function initWebRoute(app) {
    router.get('/', HomeController.getHomepage);
    router.get('/Home', HomeController.getHomepage);
    router.get('/Search', HomeController.getSearchpage);

    return app.use('/', router)
}
module.exports = initWebRoute

// export default initWebRoute;
