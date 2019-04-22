'use strict'

module.exports = function(app){

    var info = require('../controllers/infoController');

    // Info Salesman Routes
    app.route('/infosalesman')
        .get(info.list_info_salesman);

    // Info RPS Routes
    app.route('/inforps')
        .get(info.list_info_rps);
    
};

