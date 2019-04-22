'use strict'

const fs = require("fs");
const db = require('../../config/db_local');


exports.list_info_salesman = function(req, res){
    db.authenticate().then(() => {
        db.query("exec sp_json_infosalesman ", { type: db.QueryTypes.SELECT})
        .then(
            data => {
                res.json(data);
                //db.close();
            }
        )
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

exports.list_info_rps = function(req, res){
    db.authenticate().then(() => {
        db.query("exec sp_get_rpsdaily ", { type: db.QueryTypes.SELECT})
        .then(
            data => {
                res.json(data);
                //db.close();
            }
        )
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}


