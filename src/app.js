const initWebRoute = require('./Routes/Web.js');
const express = require('express');
const path = require('path');
const configViewEngine = require('./Configs/viewEngine.js');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express()
const port = 3000;

//setup view engine 
const ViewEngine = configViewEngine.configViewEngine(app);

//app.use(express.static(path.join(__dirname, "Public")));
app.set("Views", path.join(__dirname, "Views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})

initWebRoute(app)
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})