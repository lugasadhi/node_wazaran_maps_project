'use strict'

var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var port = process.env.port || 3000;

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json);

// app.use(function(req, res) {
//     res.status(404).send({url: req.originalUrl + ' not found'})
//   });

// var routes = require('./api/routers/lastLocationRoutes');
// routes(app);

app.get('/listUsers', function (req, res) {
  fs.readFile( "./users.json", 'utf8', function (err, data) {
     console.log( data );
     res.end( data );
  });
})

// app.route('/events')
// .get(function(req, res, next) {
//     fs.readFile( "./users.json", 'utf8', function (err, data) {
//         console.log( data );
//         res.json( data );
//      });
// });

// app.listen(port);
// console.log('Wazaran RESTful API server started on: ' + port);

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Wazaran RESTful API server started on http://%s:%s", host, port)
})
