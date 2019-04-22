'use strict'

module.exports = function(app){

    var location = require('../controllers/locationController');

    app.route('/hello')
    .get(function(req, res){
        res.send('Hello!')
    });

    // last Location Routes
    app.route('/locationgps')
        .get(location.list_all_lastlocation);
    
    // branch location Routes
    app.route('/locationbranch')
        .get(location.list_all_branch);

    // customer location Routes
    app.route('/locationcustomer')
        .get(location.list_all_customer);

};

