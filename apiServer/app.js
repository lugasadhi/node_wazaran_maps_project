'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.port || 8091;

const ENV = process.env;

const CONFIG = {
	PORT: ENV.PORT
}

// Run Backend Processed
// const botArea = require('./core/rps/areaCore');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var locationroutes = require('./api/routers/locationRoutes');
var inforoutes = require('./api/routers/infoRoutes');
locationroutes(app);
inforoutes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(CONFIG.PORT, () => console.log(`Wazaran RESTful API server started on ${CONFIG.PORT}!`));

